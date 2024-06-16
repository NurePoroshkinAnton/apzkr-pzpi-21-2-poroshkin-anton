import { getAxiosInstance } from "@/config/axios"
import { CreateClientDto } from "@/types/clients/dto/CreateClientDto"
import { UpdateClientDto } from "@/types/clients/dto/UpdateClientDto"
import { Client } from "@/types/clients/entities/Client"

class ClientApi {
    private axiosInstance = getAxiosInstance({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/clients`,
    })

    async getAll(): Promise<Client[]> {
        const response = await this.axiosInstance.get("")
        return response.data
    }

    async getById(id: string): Promise<Client> {
        const response = await this.axiosInstance.get(`${id}`)
        return response.data
    }

    async create(dto: CreateClientDto): Promise<Client> {
        const response = await this.axiosInstance.post("", dto)
        return response.data
    }

    async update(id: string, dto: UpdateClientDto): Promise<Client> {
        const response = await this.axiosInstance.patch(`${id}`, dto)
        return response.data
    }

    async delete(id: string): Promise<Client> {
        const response = await this.axiosInstance.delete(`${id}`)
        return response.data
    }
}

export const clientApi = new ClientApi()

