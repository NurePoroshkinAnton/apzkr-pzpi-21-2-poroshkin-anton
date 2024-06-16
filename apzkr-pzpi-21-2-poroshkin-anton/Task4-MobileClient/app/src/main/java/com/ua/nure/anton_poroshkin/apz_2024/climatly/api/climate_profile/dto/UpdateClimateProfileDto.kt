package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto

import kotlinx.serialization.Serializable

@Serializable
class UpdateClimateProfileDto(
    val name: String,
    val temperature: Int,
    val humidity: Int,
)