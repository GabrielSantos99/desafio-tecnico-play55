<template>
    <header class="w-full bg-white shadow-md">
        <div 
            class="max-w-screen-lg mx-auto px-4 py-3 flex flex-col sm:flex-row
            sm:items-center sm:justify-between"
        >
            <NuxtLink
                to="/"
                class="text-xl font-bold text-gray-900 mx-auto"
            >
                MinhaLoja
            </NuxtLink>
            <div class="relative w-full sm:max-w-md">
                <input
                    v-model="rawInput"
                    type="text"
                    placeholder="Pesquisar produtos..."
                    class="w-full sm:max-w-md px-4 py-2 my-2 bg-gray-100 rounded-full
                    text-sm focus:outline-none focus:ring focus:ring-blue-300 pl-10 sm:my-0"
                />
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <img src="/icons/icons8-search.svg" alt="Ícone de pesquisa" width="20" height="20"
                        class="w-5 h-5 text-gray-400" />
                </span>
            </div>
            <div class="flex gap-4 justify-center">
                <button
                    @click="handleToggle"
                    aria-label="Ver favoritos"
                    class="inline-flex items-center justify-center px-4 py-2
                    rounded-md text-sm font-medium transition-colors duration-200 select-none"
                >
                    <img src="/icons/heart-filled.svg" alt="Botão favorito" class="w-5 h-5" />
                </button>

                <button 
                    @click="handleCartClick"
                    aria-label="Ver carrinho"
                    class="inline-flex items-center justify-center px-4 py-2
                    rounded-md text-sm font-medium transition-colors duration-200 select-none"
                >
                    <img src="/icons/cart.svg" alt="Botão carrinho" class="w-10 h-10" />
                </button>

                <button @click="handleContactClick" aria-label="Fale conosco">Fale Conosco</button>

            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/stores/search';
import { useFavoritesFilterStore } from '~/stores/favoritesFilter';
import { useDebounce } from '@vueuse/core';
import { ref, watch } from 'vue';

const emit = defineEmits(['open-contact', 'open-cart']);

const handleContactClick = () => {
    emit('open-contact');
};

const handleCartClick = () => {
    emit('open-cart');
};

// Filtragem por favorito
const favoritesFilterStore = useFavoritesFilterStore();

const handleToggle = () => {
    favoritesFilterStore.toggleFavorites();
}

// Filtragem por title
const searchStore = useSearchStore();
const rawInput = ref('');
const debounced = useDebounce(rawInput, 400);

watch(debounced, (value) => {
    searchStore.setQuery(value)
});
</script>
