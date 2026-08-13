import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '../api/analytics.js'
import { getEvents } from '../api/events.js'

export function useAnalytics() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => getDashboard().then((r) => r.data),
  })

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvents().then((r) => r.data),
  })

  return {
    stats: stats || {},
    events: eventsData || [],
    isLoading: statsLoading || eventsLoading,
  }
}