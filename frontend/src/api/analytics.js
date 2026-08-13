import API from './axios.js'

export const getDashboard = () => API.get('/api/v1/analytics/dashboard')