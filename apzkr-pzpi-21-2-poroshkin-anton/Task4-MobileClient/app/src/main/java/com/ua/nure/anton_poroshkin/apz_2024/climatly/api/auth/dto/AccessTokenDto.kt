package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.auth.dto

import kotlinx.serialization.Serializable

@Serializable
data class AccessTokenDto(
    val accessToken: String
)