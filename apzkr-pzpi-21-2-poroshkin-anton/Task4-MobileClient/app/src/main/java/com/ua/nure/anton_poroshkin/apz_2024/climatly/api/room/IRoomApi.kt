package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.room

import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.room.dto.SetProfileActiveDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile

interface IRoomApi {
    suspend fun getActiveProfile(roomId: String): ClimateProfile?

    suspend fun setProfileActive(dto: SetProfileActiveDto)
}