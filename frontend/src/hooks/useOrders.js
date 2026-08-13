import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrders, createOrder } from '../api/orders.js'
import { ingestEvent } from '../api/events.js'
import { useCartStore } from '../store/cartStore.js'

export function useOrders() {
  const queryClient = useQueryClient()
  const { clear } = useCartStore()

  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders().then((r) => r.data),
  })

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async (res) => {
      await ingestEvent({
        event_type: 'purchase',
        properties: { total: res.data.total_amount, order_id: res.data.id },
      })
      clear()
      queryClient.invalidateQueries(['orders'])
    },
  })

  return {
    orders: data || [],
    isLoading,
    createOrder: mutation.mutate,
    isCreating: mutation.isPending,
  }
}