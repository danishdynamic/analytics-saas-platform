import { Mail, CheckCircle } from 'lucide-react'

export default function NotificationItem({ notification, onMarkRead }) {
  const isUnread = notification.status !== 'read'

  return (
    <div className={`card bg-base-100 shadow-sm ${isUnread ? 'border-l-4 border-l-primary' : ''}`}>
      <div className="card-body p-4 flex-row items-start gap-3">
        <div className={`p-2 rounded-lg shrink-0 ${notification.status === 'sent' ? 'bg-success/20 text-success' : 'bg-base-200 text-base-content/50'}`}>
          {notification.status === 'sent' ? <CheckCircle size={16} /> : <Mail size={16} />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm">{notification.title}</h3>
          <p className="text-xs text-base-content/60 mt-0.5">{notification.message}</p>
          <p className="text-xs text-base-content/40 mt-1">{new Date(notification.created_at).toLocaleString()}</p>
        </div>
        {isUnread && (
          <button onClick={() => onMarkRead(notification.id)} className="btn btn-xs btn-ghost text-primary shrink-0">
            Mark read
          </button>
        )}
      </div>
    </div>
  )
}