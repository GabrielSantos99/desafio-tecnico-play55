<template>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="dialog-title"
  >
    <div class="bg-white p-6 rounded-lg w-full max-w-md space-y-4 relative shadow-lg">
      <button
        class="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
        @click="showModal = false"
        aria-label="Fechar formulário"
      >
        ✕
      </button>

      <h2 id="dialog-title" class="text-xl font-bold text-center">Fale Conosco</h2>

      <ContactForm @success="showModal = false"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactForm from '~/components/contact/ContactForm.vue';

const showModal = defineModel<boolean>();
</script>

