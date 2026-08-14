import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrders, createOrder } from '../api/orders.js'
import { ingestEvent } from '../api/events.js'

export function useOrders() {
  const queryClient = useQueryClient()

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
      // Invalidate both orders AND notifications
      queryClient.invalidateQueries(['orders'])
      queryClient.invalidateQueries(['notifications']) 
    },
  })

  return {
    orders: data || [],
    isLoading,
    createOrder: mutation.mutate,
    isCreating: mutation.isPending,
  }
}