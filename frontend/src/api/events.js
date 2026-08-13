import API from './axios.js'

export const ingestEvent = (data) => API.post('/api/v1/events/ingest', data)
export const getEvents = (params) => API.get('/api/v1/events/', { params })