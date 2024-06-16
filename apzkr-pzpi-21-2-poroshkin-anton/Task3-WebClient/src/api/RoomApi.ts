import { getAxiosInstance } from "@/config/axios"
import { CreateRoomDto } from "@/types/rooms/dto/CreateRoomDto"
import { UpdateRoomDto } from "@/types/rooms/dto/UpdateRoomDto"
import { Room } from "@/types/rooms/entities/Room"

class RoomApi {
    private axiosInstance = getAxiosInstance({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/rooms`,
    })

    async getAll(hotelId: string): Promise<Room[]> {
        console.log("axios", hotelId)
        const response = await this.axiosInstance.get("", {
            params: {
                hotelId,
            },
        })

        return response.data
    }

    async getById(id: string): Promise<Room> {
        const response = await this.axiosInstance.get(`${id}`)
        return response.data
    }

    async create(dto: CreateRoomDto): Promise<Room> {
        const response = await this.axiosInstance.post("", dto)
        return response.data
    }

    async update(id: string, dto: UpdateRoomDto): Promise<Room> {
        const response = await this.axiosInstance.patch(`${id}`, dto)
        return response.data
    }

    async delete(id: string): Promise<Room> {
        const response = await this.axiosInstance.delete(`${id}`)
        return response.data
    }
}

export const roomApi = new RoomApi()

