import { defineStore } from 'pinia'
import type { Product } from '~/types/product'

export interface FavoriteItem {
  id: number
  title: string
  image: string
  price: number
}

interface State {
  favorites: Product[]
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): State => ({
    favorites: [],
  }),

  actions: {
    addToFavorites(item: Product) {
      const exists = this.favorites.some(fav => fav.id === item.id)
      if (!exists) {
        this.favorites.push(item)
        this.saveToLocalStorage()
      }
    },

    removeFromFavorites(itemId: number) {
      this.favorites = this.favorites.filter(fav => fav.id !== itemId)
      this.saveToLocalStorage()
    },

    isFavorited(itemId: number): boolean {
      return this.favorites.some(fav => fav.id === itemId)
    },

    saveToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem('favorites')
      if (stored) {
        this.favorites = JSON.parse(stored)
      }
    },
  },
})
