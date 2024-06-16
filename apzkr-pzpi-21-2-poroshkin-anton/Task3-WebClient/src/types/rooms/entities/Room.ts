import { ClimateDevice } from "@/types/climate-devices/entities/ClimateDevice"
import { BaseEntity } from "@/types/common/BaseEntity"
import { Hotel } from "@/types/hotels/entities/Hotel"

export type Room = BaseEntity & {
    number: number
    hotelId: string
    hotel: Hotel
    climateDevices: ClimateDevice[]
}

