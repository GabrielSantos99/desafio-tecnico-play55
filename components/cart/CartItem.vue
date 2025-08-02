<template>
	<div class="flex flex-col sm:flex-row sm:items-center
	justify-between gap-4 py-4 border-b">
		<div class="flex items-center gap-4">
			<img
				:src="product.image"
				:alt="product.title"
				class="w-12 h-12 object-contain bg-gray-100 rounded"
			/>
			<div class="flex flex-col">
				<h4 class="text-sm font-semiboldtext-gray-800 line-clamp-1">
					{{ product.title }}
				</h4>
				<span class="text-blue-700 font-bold text-sm">
					R$ {{ product.price.toFixed(2) }}
				</span>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button class="w-6 h-6 flex items-center justify-center rounded-full
				bg-gray-100 hover:bg-gray-200"
				@click="emit('decrease')">−</button>

			<span class="w-5 text-center text-sm font-medium">{{ quantity }}</span>

			<button class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100
				hover:bg-gray-200"
				@click="emit('increase')">+</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
	product: Product
	quantity: number
}>()

const emit = defineEmits<{
	(e: 'increase'): void
	(e: 'decrease'): void
}>()
</script>
