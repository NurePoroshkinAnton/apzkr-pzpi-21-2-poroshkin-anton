import { getAxiosInstance } from "@/config/axios"
import { CreateClimateDeviceDto } from "@/types/climate-devices/dto/CreateClimateDeviceDto"
import { UpdateClimateDeviceDto } from "@/types/climate-devices/dto/UpdateClimateDeviceDto"
import { ClimateDevice } from "@/types/climate-devices/entities/ClimateDevice"

class CliamteDeviceApi {
    private axiosInstance = getAxiosInstance({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/climate-devices`,
    })

    async getAll(roomId: string): Promise<ClimateDevice[]> {
        const response = await this.axiosInstance.get("", {
            params: {
                roomId,
            },
        })

        return response.data
    }

    async getById(id: string): Promise<ClimateDevice> {
        const response = await this.axiosInstance.get(`${id}`)
        return response.data
    }

    async create(dto: CreateClimateDeviceDto): Promise<ClimateDevice> {
        const response = await this.axiosInstance.post("", dto)
        return response.data
    }

    async update(
        id: string,
        dto: UpdateClimateDeviceDto
    ): Promise<ClimateDevice> {
        const response = await this.axiosInstance.patch(`${id}`, dto)
        return response.data
    }

    async delete(id: string): Promise<ClimateDevice> {
        const response = await this.axiosInstance.delete(`${id}`)
        return response.data
    }
}

export const cliamteDeviceApi = new CliamteDeviceApi()

