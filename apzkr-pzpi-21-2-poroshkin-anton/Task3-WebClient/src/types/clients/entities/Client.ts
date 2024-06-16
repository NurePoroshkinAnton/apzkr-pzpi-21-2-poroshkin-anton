import { BaseEntity } from "@/types/common/BaseEntity"
import { Room } from "@/types/rooms/entities/Room"

export type Client = BaseEntity & {
    name: string
    email: string
    roomId: string | null
    room: Room
}

