import API from './axios.js'

export const getOrders = () => API.get('/api/v1/orders/')
export const createOrder = (data) => API.post('/api/v1/orders/', data)