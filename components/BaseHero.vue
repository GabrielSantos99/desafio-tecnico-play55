<template>
    <section id="hero">
        <HeroBanner />
        <ProductList
            v-if="products"
            :products="products"
        />
    </section>
</template>

<script setup lang="ts">
import HeroBanner from './banner/HeroBanner.vue';
import ProductList from './products/ProductList.vue';
import { useProducts } from '~/composables/useProducts';

const products = await useProducts();
</script>
