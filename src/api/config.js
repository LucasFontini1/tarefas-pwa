import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://0.0.0.0:8001/' || 'http://localhost:8001/' || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
