import { getAxiosInstance } from "@/config/axios"
import { CreateHotelDto } from "@/types/hotels/dto/CreateHotelDto"
import { UpdateHotelDto } from "@/types/hotels/dto/UpdateHotelDto"
import { Hotel } from "@/types/hotels/entities/Hotel"

class HotelApi {
    private axiosInstance = getAxiosInstance({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/hotels`,
    })

    async getAll(): Promise<Hotel[]> {
        const response = await this.axiosInstance.get("")

        return response.data
    }

    async getById(id: string): Promise<Hotel> {
        const response = await this.axiosInstance.get(`${id}`)
        return response.data
    }

    async create(dto: CreateHotelDto): Promise<Hotel> {
        const response = await this.axiosInstance.post("", dto)
        return response.data
    }

    async update(id: string, dto: UpdateHotelDto): Promise<Hotel> {
        const response = await this.axiosInstance.patch(`${id}`, dto)
        return response.data
    }

    async delete(id: string): Promise<Hotel> {
        const response = await this.axiosInstance.delete(`${id}`)
        return response.data
    }
}

export const hotelApi = new HotelApi()

