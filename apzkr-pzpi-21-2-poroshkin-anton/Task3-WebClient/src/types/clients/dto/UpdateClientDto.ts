import { CreateClientDto } from "@/types/clients/dto/CreateClientDto"

export type UpdateClientDto = Partial<CreateClientDto> &
    Partial<{
        roomId: string | null
    }>

