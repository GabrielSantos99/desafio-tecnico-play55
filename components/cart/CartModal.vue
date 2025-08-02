<template>
    <div class="fixed inset-0 z-50 bg-black
    bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white w-[90%] max-h-[85vh] overflow-y-auto overflow-hidden rounded-xl
        shadow-lg sm:max-w-md sm:h-auto">

            <div class="flex items-center justify-between px-4 py-2 border-b">
                <h2 class="text-lg font-semibold">Meu carrinho</h2>
                <button @click="emit('close')" aria-label="Fechar modal">
                    <span class="text-2xl font-light">×</span>
                </button>
            </div>

            <div v-if="cartStore.items.length" class="p-4 space-y-2">
                <CartItem
                    v-for="item in cartStore.items"
                    :key="item.product.id"
                    :product="item.product"
                    :quantity="item.quantity"
                    @increase="cartStore.addToCart(item.product)"
                    @decrease="
                        item.quantity > 1
                            ? cartStore.items.find((i: CartItemType) => i.product.id === item.product.id)!.quantity--
                            : cartStore.items.splice(cartStore.items.indexOf(item), 1);
                    cartStore.saveToLocalStorage();
                    " />
            </div>

            <div v-else class="p-6 text-center text-gray-500">
                Seu carrinho está vazio.
            </div>

            <div class="border-t p-4 flex flex-col gap-3">
                <div class="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span class="text-blue-700 font-bold text-2xl">{{ formattedTotal }}</span>
                </div>

                <button
                    :class="[
                        'w-full py-2 rounded-lg text-sm font-semibold transition-colors',
                        cartStore.items.length === 0
                            ? 'bg-gray-300 text-white cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 active:shadow-inner'
                    ]"
                    :disabled="cartStore.items.length === 0"
                    @click="handleCheckout"
                >
                    Finalizar Compra
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import CartItem from '~/components/cart/CartItem.vue';
import { computed } from 'vue';
import type { CartItemType } from '~/types/cartItem';

const emit = defineEmits<{
    (e: 'close'): void
}>();

const cartStore = useCartStore();

const formattedTotal = computed(() => {
    return `R$ ${cartStore.totalPrice.toFixed(2)}`
});

const handleCheckout = () => {
    alert('Compra finalizada com sucesso!');
    cartStore.clearCart();
    emit('close');
};
</script>
