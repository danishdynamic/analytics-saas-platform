import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationStore } from '../store/notificationStore.js'
import { getNotifications, markAsRead } from '../api/notifications.js'

export function useNotifications() {
  const queryClient = useQueryClient()
  const { markRead } = useNotificationStore()

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications().then((r) => r.data),
    refetchInterval: 5000,
  })

  const mutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: (_, id) => {
      markRead(id)
      queryClient.invalidateQueries(['notifications'])
    },
  })

  return {
    notifications: data || [],
    isLoading,
    markAsRead: mutation.mutate,
  }
}