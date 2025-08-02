import { defineStore } from 'pinia';
import type { Product } from '~/types/product';
import type { CartItemType } from '~/types/cartItem';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItemType[]
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  },

  actions: {
    addToCart(product: Product) {
      const existing = this.items.find(item => item.product.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
      this.saveToLocalStorage();
    },

    

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },

    loadFromLocalStorage() {
      const data = localStorage.getItem('cart');
      if (data) {
        this.items = JSON.parse(data);
      }
    },
  }
})
