import { ClimateDeviceType } from "@/types/climate-devices/entities/ClimateDevice"

export type CreateClimateDeviceDto = {
    type: ClimateDeviceType
    address: string
    accessionNumber: string
    manufacturer: string
    roomId: string
}

