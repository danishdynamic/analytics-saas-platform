import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../store/authStore.js'
import { login, signup } from '../api/auth.js'

export function useLogin() {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setAuth(res.data, { email: res.data.access_token.split('.')[1] }) // decode from JWT if needed
      // Better: decode JWT payload
      const payload = JSON.parse(atob(res.data.access_token.split('.')[1]))
      setAuth(res.data, { email: payload.sub, id: payload.user_id })
    },
  })
}

export function useSignup() {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      const payload = JSON.parse(atob(res.data.access_token.split('.')[1]))
      setAuth(res.data, { email: payload.sub, id: payload.user_id })
    },
  })
}