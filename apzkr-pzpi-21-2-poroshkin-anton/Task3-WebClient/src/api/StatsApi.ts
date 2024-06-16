import { getAxiosInstance } from "@/config/axios"
import { CliamteDeviceStatsDto } from "@/types/stats/dto/ClimateDeviceStatsDto"
import { ManufacturerStatsDto } from "@/types/stats/dto/ManufacturerStatsDto"

class StatsApi {
    private axiosInstance = getAxiosInstance({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/stats`,
    })

    async getClimateDeviceStats() {
        const response = await this.axiosInstance.get<CliamteDeviceStatsDto>(
            "climate-devices"
        )
        return response.data
    }

    async getClimateDeviceStatsForHotel(hotelId: string) {
        const response = await this.axiosInstance.get<CliamteDeviceStatsDto>(
            `climate-devices/hotel/${hotelId}`
        )

        return response.data
    }

    async getManufacturerStats() {
        const response = await this.axiosInstance.get<ManufacturerStatsDto[]>(
            `manufacturers`
        )

        return response.data
    }
}

export const statsApi = new StatsApi()

