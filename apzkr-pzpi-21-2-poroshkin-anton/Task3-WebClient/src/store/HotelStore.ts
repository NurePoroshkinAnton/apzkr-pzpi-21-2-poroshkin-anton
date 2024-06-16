import { autorun, makeAutoObservable, runInAction } from "mobx"
import { message } from "antd"
import { Hotel } from "@/types/hotels/entities/Hotel"
import { hotelApi } from "@/api/HotelApi"
import { CreateHotelDto } from "@/types/hotels/dto/CreateHotelDto"
import { UpdateHotelDto } from "@/types/hotels/dto/UpdateHotelDto"
import i18next from "i18next"

const { t } = i18next

class HotelStore {
    constructor() {
        makeAutoObservable(this)
    }

    hotels: Hotel[] = []
    isLoading: boolean = false
    isReady: boolean = false
    needsUpdate: boolean = false

    async fetchAll() {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            const hotels = await hotelApi.getAll()

            runInAction(() => {
                this.hotels = hotels
                this.isReady = true
            })
        } catch (error) {
            message.error(t("fetchHotelsError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async create(dto: CreateHotelDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await hotelApi.create(dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("createHotelError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async update(id: string, dto: UpdateHotelDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await hotelApi.update(id, dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("updateHotelError"))
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

            await hotelApi.delete(id)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("deleteHotelError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }
}

export const hotelStore = new HotelStore()

autorun(async () => {
    if (hotelStore.needsUpdate) {
        await hotelStore.fetchAll()
        runInAction(() => {
            hotelStore.needsUpdate = false
        })
    }
})

