import { autorun, makeAutoObservable, runInAction } from "mobx"
import { message } from "antd"
import { Room } from "@/types/rooms/entities/Room"
import { roomApi } from "@/api/RoomApi"
import { CreateRoomDto } from "@/types/rooms/dto/CreateRoomDto"
import { UpdateRoomDto } from "@/types/rooms/dto/UpdateRoomDto"
import i18next from "i18next"

const { t } = i18next

class RoomStore {
    constructor() {
        makeAutoObservable(this)
    }

    hotelId: string = ""
    rooms: Room[] = []
    isLoading: boolean = false
    isReady: boolean = false
    needsUpdate: boolean = false

    async fetchAll() {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            const rooms = await roomApi.getAll(this.hotelId)

            runInAction(() => {
                this.rooms = rooms
                this.isReady = true
            })
        } catch (error) {
            message.error(t("fetchRoomsError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async create(dto: CreateRoomDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await roomApi.create(dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("createRoomError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async update(id: string, dto: UpdateRoomDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await roomApi.update(id, dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("updateRoomError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async delete(id: string) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await roomApi.delete(id)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("deleteRoomError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    setHotelId(hotelId: string) {
        this.hotelId = hotelId
    }
}

export const roomStore = new RoomStore()

autorun(async () => {
    if (roomStore.needsUpdate) {
        await roomStore.fetchAll()
        runInAction(() => {
            roomStore.needsUpdate = false
        })
    }
})

