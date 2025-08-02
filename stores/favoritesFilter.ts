// stores/ui.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesFilterStore = defineStore('favoritesFilter', () => {
  const showOnlyFavorites = ref(false);

  const toggleFavorites = () => {
    showOnlyFavorites.value = !showOnlyFavorites.value
  };

  return {
    showOnlyFavorites,
    toggleFavorites
  }
})
