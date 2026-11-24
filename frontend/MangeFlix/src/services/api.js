
import axios from 'axios'
import { obterToken } from './auth'

const api = axios.create({
    baseURL: import.meta.env.FRONTEND_API_URL+'/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(config => {
    const token = obterToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api
