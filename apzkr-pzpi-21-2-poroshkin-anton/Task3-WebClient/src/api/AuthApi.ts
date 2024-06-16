import { getAxiosInstance } from "@/config/axios"
import { AccessTokenResponseDto } from "@/types/auth/dto/AccessTokenResponseDto"
import { SigninCompanyDto } from "@/types/auth/dto/SigninCompanyDto"
import { SignupComapnyDto } from "@/types/auth/dto/SignupCompanyDto"
import { Client } from "@/types/clients/entities/Client"
import { Company } from "@/types/companies/entities/Company"

class AuthApi {
    private axiosInstance = getAxiosInstance({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
    })

    async signinCompany(
        dto: SigninCompanyDto
    ): Promise<AccessTokenResponseDto> {
        const response = await this.axiosInstance.post("signin/company", dto)
        return response.data
    }

    async signupCompany(
        dto: SignupComapnyDto
    ): Promise<AccessTokenResponseDto> {
        const response = await this.axiosInstance.post("signup/company", dto)
        return response.data
    }

    async signinClient(): Promise<AccessTokenResponseDto> {
        const response = await this.axiosInstance.get("google/signin")
        return response.data
    }

    async getCompanyProfile(): Promise<Company> {
        const response = await this.axiosInstance.get("profile/company")
        return response.data
    }

    async getClientProfile(): Promise<Client> {
        const response = await this.axiosInstance.get("profile/client")
        return response.data
    }
}

export const authApi = new AuthApi()

