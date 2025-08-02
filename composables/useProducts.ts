import { ProductsSchema } from '~/types/product';
import type { Product } from '~/types/product';

export const useProducts = async () => {
  const { data, error } = await useFetch<Product[]>('https://fakestoreapi.com/products');

  if (error.value) {
    console.error('Erro ao carregar produtos:', error.value);
  }

  try {
    return ProductsSchema.parse(data.value) as Product[]
  } catch (validationError) {
    console.error('Erro de validação Zod:', validationError)
    return []
  }
}
