package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile

import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.CreateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.UpdateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile

interface IClimateProfileApi {
    suspend fun getAll(token: String): List<ClimateProfile>

    suspend fun getById(id: String, token: String): ClimateProfile

    suspend fun create(dto: CreateClimateProfileDto, token: String): ClimateProfile

    suspend fun update(id: String, dto: UpdateClimateProfileDto, token: String): ClimateProfile

    suspend fun delete(id: String, token: String)
}