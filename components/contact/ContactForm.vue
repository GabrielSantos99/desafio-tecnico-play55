<template>
    <form @submit.prevent="onSubmit" class="space-y-4" aria-label="Formulário de contato">
        <div>
            <input v-model="name" type="text" placeholder="Seu nome"
                aria-label="Espaço destinado a digitar seu nome completo"
                class="w-full px-4 py-2 border rounded bg-[#374151] border-[#4B5563]
                placeholder-[#9CA3AF] text-white" />
            <span class="text-red-600 text-sm" role="alert">{{ nameError }}</span>
        </div>

        <div>
            <input v-model="email" type="email" placeholder="Seu e-mail"
                aria-label="Espaço destinado a digitar seu e-mail"
                class="w-full px-4 py-2 border rounded bg-[#374151] border-[#4B5563]
                placeholder-[#9CA3AF] text-white" />
            <span class="text-red-600 text-sm" role="alert">{{ emailError }}</span>
        </div>

        <div>
            <input v-model="phone" @input="onPhoneInput" placeholder="Seu telefone"
                aria-label="Espaço destinado a digitar seu número de telefone"
                class="w-full px-4 py-2 border rounded bg-[#374151] border-[#4B5563]
                placeholder-[#9CA3AF] text-white" />
            <span class="text-red-600 text-sm" role="alert">{{ phoneError }}</span>
        </div>

        <div>
            <input v-model="birthdate" @input="onBirthdateInput" placeholder="Sua data de nascimento"
                aria-label="Espaço destinado a digitar sua data de nascimento"
                class="w-full px-4 py-2 border rounded bg-[#374151] border-[#4B5563]
                placeholder-[#9CA3AF] text-white" />
            <span class="text-red-600 text-sm" role="alert">{{ birthdateError }}</span>
        </div>

        <div>
            <input v-model="cpf" @input="onCpfInput" placeholder="CPF" aria-label="Espaço destinado a digitar seu CPF"
                class="w-full px-4 py-2 border rounded bg-[#374151] border-[#4B5563]
                placeholder-[#9CA3AF] text-white" />
            <span class="text-red-600 text-sm" role="alert">{{ cpfError }}</span>
        </div>

        <div>
            <input v-model="message" placeholder="Sua mensagem" aria-label="Espaço destinado a digitar sua mensagem"
                class="w-full px-4 pt-2 pb-16 border rounded bg-[#374151] border-[#4B5563]
                placeholder-[#9CA3AF] text-white" />
            <span class="text-red-600 text-sm" role="alert">{{ messageError }}</span>
        </div>

        <button
          type="submit"
          :class="[
            'w-full py-2 font-bold rounded text-white transition-colors duration-200 ease-in-out',
            isFormValid && !submitting
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-600 cursor-not-allowed opacity-50'
          ]"
          :disabled="submitting || !isFormValid"
          aria-label="Enviar formulário"
        >
          {{ submitting ? 'Enviando...' : 'Enviar Mensagem' }}
        </button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useRecaptcha } from '~/composables/useRecaptch';
import { computed } from 'vue';

const emit = defineEmits(['success']);

const schema = z.object({
    name: z.string().min(2, 'Nome obrigatório'),
    email: z.string().email('Email inválido'),
    phone: z.preprocess(
        (val) => String(val).replace(/\D/g, ''),
        z.string().regex(/^\d{11}$/, 'Telefone inválido (apenas números, ex: 11999998888)')
    ),
    birthdate: z.preprocess(
        (val) => String(val).replace(/\D/g, ''),
        z.string().regex(/^\d{8}$/, 'Data inválida (formato: DDMMAAAA)')
    ),
    cpf: z.preprocess(
        (val) => String(val).replace(/\D/g, ''),
        z.string().regex(/^\d{11}$/, 'CPF inválido (apenas números)')
    ),
    message: z.string().min(1, 'Mensagem obrigatória'),
});

const { handleSubmit, meta } = useForm({
    validationSchema: toTypedSchema(schema),
});

const isFormValid = computed(() => meta.value.valid);

const { value: name, errorMessage: nameError } = useField('name');
const { value: email, errorMessage: emailError } = useField('email');
const { value: phone, errorMessage: phoneError } = useField('phone');
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate');
const { value: cpf, errorMessage: cpfError } = useField('cpf');
const { value: message, errorMessage: messageError } = useField('message');

const submitting = ref(false);
const { executeRecaptcha } = useRecaptcha();

const formatWithMask = (rawValue: string, mask: string): string => {
    const numbers = rawValue.replace(/\D/g, '');
    let result = '';
    let numberIndex = 0;

    for (let i = 0; i < mask.length && numberIndex < numbers.length; i++) {
        if (mask[i] === '#') {
            result += numbers[numberIndex];
            numberIndex++;
        } else {
            result += mask[i];
        }
    }

    return result;
};

const onPhoneInput = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    phone.value = formatWithMask(input.value, '(##) #####-####');
};

const onBirthdateInput = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    birthdate.value = formatWithMask(input.value, '##/##/####');
};

const onCpfInput = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    cpf.value = formatWithMask(input.value, '###.###.###-##');
};

const clearInputs = () => {
    name.value = '';
    email.value = '';
    phone.value = '';
    birthdate.value = '';
    cpf.value = '';
    message.value = '';

    nameError.value = '';
    emailError.value = '';
    phoneError.value = '';
    birthdateError.value = '';
    cpfError.value = '';
    messageError.value = '';
};

const onSubmit = handleSubmit(async (values) => {
    submitting.value = true;

    try {
        const token = await executeRecaptcha('form_submit');
        await $fetch('/validar-recaptcha', {
            method: 'POST',
            body: {
                ...values,
                message: message.value,
                token
            }
        });
        alert('Mensagem enviada com sucesso!');

        emit('success');

        clearInputs();
    } catch (error) {
        alert('Erro ao enviar mensagem.');
    } finally {
        submitting.value = false;
    }
});
</script>