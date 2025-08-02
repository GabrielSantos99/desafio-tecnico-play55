<template>
    <div class="flex flex-col border rounded-lg overflow-hidden shadow-sm
    transition-transform duration-300 sm:hover:shadow-lg sm:hover:-translate-y-1
    sm:hover:scale-[1.02] bg-white">
    <div class="relative">
      <img
        :src="product.image"
        :alt="product.title"
        loading="lazy"
        class="w-full aspect-[4/3] object-contain p-4 bg-gray-50"
      />

      <button
        class="absolute top-2 right-2 bg-white backdrop-blur-sm p-1 rounded-full shadow
            sm:hover:bg-white transition active:scale-95 active:shadow-inner select-none"
        @click="handleToggleFavorite"
        variant="icon"
        aria-label="Favoritar produto"
      >
        <img
          v-if="isFavorited"
          src="/icons/heart-filled.svg"
          alt="Produto favoritado"
          class="w-5 h-5"
        />
        <img
          v-else
          src="/icons/heart-outline.svg"
          alt="Favoritar produto"
          class="w-5 h-5"
        />
      </button>
    </div>

    <div class="flex flex-col p-4 gap-2">
      <h3 class="text-base font-bold line-clamp-2 text-gray-800">
        {{ product.title }}
      </h3>
      <p class="text-gray-400 text-sm">
        {{ product.category }}
      </p>
      <p class="text-gray-800 font-bold text-base">
        R$ {{ product.price.toFixed(2) }}
      </p>
      
      <button
        class="mt-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600
        sm:hover:bg-blue-700 rounded shadow active:scale-95
        active:shadow-inner select-none"
        variant="primary"
        @click="handleAddToCart"
        aria-label="Adicionar produto ao carrinho"
      >
        Adicionar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '~/types/product';
  
  const props = defineProps<{
    product: Product
    isFavorited: boolean
  }>();

  const emit = defineEmits<{
    (e: 'add-to-cart', product: Product): void
    (e: 'toggle-favorite', product: Product): void
  }>();

  const handleAddToCart = () => {
    emit('add-to-cart', props.product)
  };
  
  const handleToggleFavorite = () => {
    emit('toggle-favorite', props.product)
  };
</script>
