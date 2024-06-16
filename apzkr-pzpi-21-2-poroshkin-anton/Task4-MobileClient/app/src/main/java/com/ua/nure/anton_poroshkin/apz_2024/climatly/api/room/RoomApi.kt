package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.room

import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.HttpRoutes
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.room.dto.SetProfileActiveDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url

class RoomApi(private val httpClient: HttpClient) : IRoomApi {
    override suspend fun getActiveProfile(roomId: String): ClimateProfile? {
        val response = httpClient.get {
            url("${HttpRoutes.ROOMS}/active-profile?roomId=${roomId}")
        }

        val activeProfile: ClimateProfile = response.body()
        return activeProfile
    }

    override suspend fun setProfileActive(dto: SetProfileActiveDto) {
        httpClient.post {
            url("${HttpRoutes.ROOMS}/set-active-profile")
            setBody(dto)
        }
    }
}