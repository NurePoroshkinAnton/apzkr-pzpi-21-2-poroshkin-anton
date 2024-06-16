import { Role } from "@/types/common/Role"

export type JwtPayload = {
    sub: string
    email: string
    role: Role
}
