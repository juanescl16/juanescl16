import { AxiosResponse } from './../global.d'
import Axios, { InternalAxiosRequestConfig } from 'axios'
// const store = useStore()

const axios = Axios.create({
    baseURL: process.env.VUE_APP_VECINDAPP_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<void>) => {
        const token = localStorage.getItem('vecindapp_api_token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (config: InternalAxiosRequestConfig<void>) => {
        return config
    }
)

export const useVecindappApiClient = () => ({
    get: (url: string, params?: any): Promise<AxiosResponse> => axios.get(url, { params }),
    post: (url: string, data?: any): Promise<AxiosResponse> => axios.post(url, data),
})
