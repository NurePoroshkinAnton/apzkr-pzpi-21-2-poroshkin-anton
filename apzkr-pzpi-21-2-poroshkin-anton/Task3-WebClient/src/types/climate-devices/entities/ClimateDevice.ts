import { BaseEntity } from "@/types/common/BaseEntity"
import { Room } from "@/types/rooms/entities/Room"

export enum ClimateDeviceType {
    Thermostat = "thermostat",
    Humidistat = "humidistat",
}

export enum ClimateDeviceStatus {
    Ok = "ok",
    Warning = "warning",
    Error = "error",
}

export type ClimateDevice = BaseEntity & {
    type: ClimateDeviceType
    address: string
    accessionNumber: string
    manufacturer: string
    status: ClimateDeviceStatus
    roomId: string
    room: Room
}

