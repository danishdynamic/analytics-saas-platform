import { create } from 'zustand'

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unread: 0,

  setNotifications: (data) =>
    set({
      notifications: data,
      unread: data.filter((n) => n.status !== 'read').length,
    }),

  markRead: (id) => {
    const updated = get().notifications.map((n) =>
      n.id === id ? { ...n, status: 'read' } : n
    )
    set({
      notifications: updated,
      unread: updated.filter((n) => n.status !== 'read').length,
    })
  },

  add: (notification) =>
    set({
      notifications: [notification, ...get().notifications],
      unread: get().unread + 1,
    }),
}))