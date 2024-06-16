import { BaseEntity } from "@/types/common/BaseEntity"
import { Room } from "@/types/rooms/entities/Room"

export type Hotel = BaseEntity & {
    name: string
    address: string
    rooms: Room[]
}

