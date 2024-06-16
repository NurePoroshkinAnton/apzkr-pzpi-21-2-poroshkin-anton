import { ACCESS_TOKEN_LS_KEY } from "@/config/constants"
import axios from "axios"
import { CreateAxiosDefaults } from "axios"

export function getAxiosInstance(options: CreateAxiosDefaults) {
    const instance = axios.create(options)

    instance.interceptors.request.use((config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_LS_KEY)

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    })

    return instance
}

