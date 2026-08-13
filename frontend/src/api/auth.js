import API from './axios.js'

export const signup = (data) => API.post('/api/v1/auth/signup', data)
export const login = (data) => API.post('/api/v1/auth/login', data)
export const refresh = (token) => API.post('/api/v1/auth/refresh', { refresh_token: token })
export const logout = (token) => API.post('/api/v1/auth/logout', { refresh_token: token })