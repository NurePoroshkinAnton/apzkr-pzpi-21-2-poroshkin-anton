import { makeAutoObservable, runInAction } from "mobx"
import { message } from "antd"
import { authApi } from "@/api/AuthApi"
import { ACCESS_TOKEN_LS_KEY } from "@/config/constants"
import { Company } from "@/types/companies/entities/Company"
import { Client } from "@/types/clients/entities/Client"
import { SigninCompanyDto } from "@/types/auth/dto/SigninCompanyDto"
import { SignupComapnyDto } from "@/types/auth/dto/SignupCompanyDto"
import i18next from "i18next"

const { t } = i18next

class AuthStore {
    constructor() {
        makeAutoObservable(this)
    }

    company: Company | null = null
    client: Client | null = null
    isLoading = false
    isReady = false

    async signinCompany(dto: SigninCompanyDto) {
        try {
            this.isLoading = true

            const signinResponse = await authApi.signinCompany(dto)

            localStorage.setItem(
                ACCESS_TOKEN_LS_KEY,
                signinResponse.accessToken
            )

            const profile = await authApi.getCompanyProfile()

            runInAction(() => {
                this.company = profile
            })
        } catch (error) {
            message.error(t("signinError"))
        } finally {
            this.isLoading = false
        }
    }

    async signupCompany(dto: SignupComapnyDto) {
        try {
            this.isLoading = true

            const signupResponse = await authApi.signupCompany(dto)

            localStorage.setItem(
                ACCESS_TOKEN_LS_KEY,
                signupResponse.accessToken
            )

            const profile = await authApi.getCompanyProfile()

            runInAction(() => {
                this.company = profile
            })
        } catch (error) {
            message.error(t("signupError"))
        } finally {
            this.isLoading = false
        }
    }

    setReady(isReady: boolean) {
        this.isReady = isReady
    }

    async getCompanyProfile() {
        const profile = await authApi.getCompanyProfile()

        runInAction(() => {
            this.company = profile
            this.isReady = true
        })
    }

    async getClientProfile() {
        const profile = await authApi.getClientProfile()

        runInAction(() => {
            this.client = profile
            this.isReady = true
        })
    }

    async signout() {
        runInAction(() => {
            this.client = null
            this.company = null
        })

        localStorage.setItem(ACCESS_TOKEN_LS_KEY, "")
    }
}

export const authStore = new AuthStore()

