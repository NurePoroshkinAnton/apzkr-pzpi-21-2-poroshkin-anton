import { BaseEntity } from "@/types/common/BaseEntity"

export type Company = BaseEntity & {
    name: string
    email: string
}

