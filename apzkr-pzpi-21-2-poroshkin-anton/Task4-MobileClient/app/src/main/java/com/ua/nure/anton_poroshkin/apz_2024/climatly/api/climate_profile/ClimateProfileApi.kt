package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile

import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.HttpRoutes
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.CreateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.UpdateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.delete
import io.ktor.client.request.get
import io.ktor.client.request.headers
import io.ktor.client.request.patch
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url

class ClimateProfileApi(private val httpClient: HttpClient) : IClimateProfileApi {
    override suspend fun getAll(token: String): List<ClimateProfile> {
        val response = httpClient.get {
            url(HttpRoutes.CLIMATE_PROFILES)
            headers {
                append("Authorization", "Bearer $token")
            }
        }

        return response.body()
    }

    override suspend fun getById(id: String, token: String): ClimateProfile {
        val response = httpClient.get {
            url("${HttpRoutes.CLIMATE_PROFILES}/$id")
            headers {
                append("Authorization", "Bearer $token")
            }
        }

        return response.body()
    }

    override suspend fun create(dto: CreateClimateProfileDto, token: String): ClimateProfile {
        val response = httpClient.post {
            url(HttpRoutes.CLIMATE_PROFILES)
            headers {
                append("Authorization", "Bearer $token")
            }
            setBody(dto)
        }

        return response.body()
    }

    override suspend fun update(
        id: String,
        dto: UpdateClimateProfileDto,
        token: String
    ): ClimateProfile {
        val response = httpClient.patch {
            url("${HttpRoutes.CLIMATE_PROFILES}/$id")
            headers {
                append("Authorization", "Bearer $token")
            }
            setBody(dto)
        }

        return response.body()
    }

    override suspend fun delete(id: String, token: String) {
        httpClient.delete {
            url("${HttpRoutes.CLIMATE_PROFILES}/$id")
            headers {
                append("Authorization", "Bearer $token")
            }
        }
    }
}