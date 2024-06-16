import { autorun, makeAutoObservable, runInAction } from "mobx"
import { message } from "antd"
import { ClimateDevice } from "@/types/climate-devices/entities/ClimateDevice"
import { cliamteDeviceApi } from "@/api/ClimateDeviceApi"
import { CreateClimateDeviceDto } from "@/types/climate-devices/dto/CreateClimateDeviceDto"
import { UpdateClimateDeviceDto } from "@/types/climate-devices/dto/UpdateClimateDeviceDto"
import i18next from "i18next"

const { t } = i18next
class CliamteDeviceStore {
    constructor() {
        makeAutoObservable(this)
    }

    roomId: string = ""
    climateDevices: ClimateDevice[] = []
    isLoading: boolean = false
    isReady: boolean = false
    needsUpdate: boolean = false

    async fetchAll() {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            const cliamteDevices = await cliamteDeviceApi.getAll(this.roomId)

            runInAction(() => {
                this.climateDevices = cliamteDevices
                this.isReady = true
            })
        } catch (error) {
            message.error(t("fetchClimateDevicesError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async create(dto: CreateClimateDeviceDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await cliamteDeviceApi.create(dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("createClimateDeviceError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async update(id: string, dto: UpdateClimateDeviceDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await cliamteDeviceApi.update(id, dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("updateClimateDeviceError"))
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

            await cliamteDeviceApi.delete(id)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("deleteClimateDeviceError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    setRoomId(roomId: string) {
        this.roomId = roomId
    }
}

export const climateDeviceStore = new CliamteDeviceStore()

autorun(async () => {
    if (climateDeviceStore.needsUpdate) {
        await climateDeviceStore.fetchAll()
        runInAction(() => {
            climateDeviceStore.needsUpdate = false
        })
    }
})

