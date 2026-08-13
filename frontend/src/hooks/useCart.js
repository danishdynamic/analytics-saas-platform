import { useCartStore } from '../store/cartStore.js'
import { ingestEvent } from '../api/events.js'
import { useAuthStore } from '../store/authStore.js'

export function useCart() {
  const { items, add, remove, clear, total, count } = useCartStore()
  const { isAuth } = useAuthStore()

  const addItem = async (product) => {
    add(product)

    if (isAuth) {
      await ingestEvent({
        event_type: 'added_to_cart',
        properties: {
          product_id: product.id,
          name: product.name,
          price: product.price,
        },
      })
    }
  }

  return { items, addItem, remove, clear, total, count }
}