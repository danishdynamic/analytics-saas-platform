import { useNotifications } from '../hooks/useNotifications.js'
import NotificationItem from '../components/NotificationItem.jsx'
import { Bell } from 'lucide-react'

export default function Notifications() {
  const { notifications, isLoading, markAsRead } = useNotifications()

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-md text-primary"></span>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-base-content/20 mx-auto mb-3" />
          <p className="text-base-content/50 text-sm">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onMarkRead={markAsRead} />
          ))}
        </div>
      )}
    </div>
  )
}