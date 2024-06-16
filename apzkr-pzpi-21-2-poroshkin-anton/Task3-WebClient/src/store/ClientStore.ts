import { autorun, makeAutoObservable, runInAction } from "mobx"
import { message } from "antd"
import { Client } from "@/types/clients/entities/Client"
import { clientApi } from "@/api/ClientApi"
import { CreateClientDto } from "@/types/clients/dto/CreateClientDto"
import { UpdateClientDto } from "@/types/clients/dto/UpdateClientDto"
import i18next from "i18next"

const { t } = i18next
class ClientStore {
    constructor() {
        makeAutoObservable(this)
    }

    clients: Client[] = []
    isLoading: boolean = false
    isReady: boolean = false
    needsUpdate: boolean = false

    async fetchAll() {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            const clients = await clientApi.getAll()

            runInAction(() => {
                this.clients = clients
                this.isReady = true
            })
        } catch (error) {
            message.error(t("fetchClientsError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async create(dto: CreateClientDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await clientApi.create(dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("createClientError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async update(id: string, dto: UpdateClientDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await clientApi.update(id, dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("updateClientError"))
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

            await clientApi.delete(id)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(t("deleteClientError"))
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }
}

export const clientStore = new ClientStore()

autorun(async () => {
    if (clientStore.needsUpdate) {
        await clientStore.fetchAll()

        runInAction(() => {
            clientStore.needsUpdate = false
        })
    }
})

