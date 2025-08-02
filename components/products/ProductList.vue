<template>
    <div class="flex items-center justify-center py-4">
        <h2 class="text-2xl font-semibold text-center">
            {{ favoritesFilterStore.showOnlyFavorites ?
            'Produtos Favoritos' : 'Todos os Produtos' }}
        </h2>
    </div>
    <section class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            :isFavorited="favoritesStore.isFavorited(product.id)"
            @add-to-cart="handleAddToCart"
            @toggle-favorite="handleToggleFavorite"
        />
    </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product';
import ProductCard from './ProductCard.vue';
import { useFavoritesStore } from '~/stores/favorites';
import { onMounted, computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import { useSearchStore } from '~/stores/search';
import { useFavoritesFilterStore } from '~/stores/favoritesFilter';

const props = defineProps<{
    products: Product[],
}>();

const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
const searchStore = useSearchStore();
const favoritesFilterStore = useFavoritesFilterStore();

onMounted(() => {
    favoritesStore.loadFromLocalStorage();
    cartStore.loadFromLocalStorage();
});

const handleAddToCart = (product: Product) => {
    cartStore.addToCart(product);
};

const handleToggleFavorite = (product: Product) => {
    const isFavorited = favoritesStore.isFavorited(product.id);

    if (isFavorited) {
        favoritesStore.removeFromFavorites(product.id);
    } else {
        favoritesStore.addToFavorites(product);
    }
};

const filteredProducts = computed(() => {
    const value = searchStore.query.toLowerCase();
    let result = props.products.filter(product =>
        product.title.toLowerCase().includes(value)
    );


    if (favoritesFilterStore.showOnlyFavorites) {
        result = result.filter(product => favoritesStore.isFavorited(product.id))
    }

    return result
});
</script>
