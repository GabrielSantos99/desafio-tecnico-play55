<template>
	<div>
		<BaseHeader @open-contact="showContactModal = true" @open-cart="showCartModal = true" />
		<div class="px-8 lg:px-64">
			<NuxtPage />
		</div>
		<BaseFooter />

		<ContactModal v-model="showContactModal" />
		<CartModal v-if="showCartModal" @close="showCartModal = false" />
	</div>
</template>

<script setup lang="ts">
import BaseHeader from './components/BaseHeader.vue';
import BaseFooter from './components/BaseFooter.vue';
import ContactModal from './components/contact/ContactModal.vue';
import CartModal from './components/cart/CartModal.vue'
import { ref, onMounted } from 'vue';
import { useCartStore } from '~/stores/cart';
import { useFavoritesStore } from '~/stores/favorites';

onMounted(() => {
	const cart = useCartStore();
	cart.loadFromLocalStorage();

	const favorites = useFavoritesStore();
	favorites.loadFromLocalStorage();
});

const showContactModal = ref(false);
const showCartModal = ref(false);
</script>
