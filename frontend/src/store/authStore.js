import { create } from 'zustand'

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuth: false,

  setAuth: (tokens, user) => {
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
    set({ user, isAuth: true })
  },

  logout: () => {
    localStorage.clear()
    set({ user: null, isAuth: false })
  },

  init: () => {
    const token = localStorage.getItem('access_token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        set({ user: { email: payload.sub, id: payload.user_id }, isAuth: true })
      } catch {
        get().logout()
      }
    }
  },
}))