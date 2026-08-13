import API from './axios.js'

export const getNotifications = () => API.get('/api/v1/notifications/')
export const markAsRead = (id) => API.post(`/api/v1/notifications/${id}/read`)