import { ClimateDeviceStatus } from "@/types/climate-devices/entities/ClimateDevice"

type CliamteDeviceStatsGroup = {
    status: ClimateDeviceStatus
    count: number
    percentage: number
}

export type CliamteDeviceStatsDto = {
    total: number
    groups: CliamteDeviceStatsGroup[]
}

