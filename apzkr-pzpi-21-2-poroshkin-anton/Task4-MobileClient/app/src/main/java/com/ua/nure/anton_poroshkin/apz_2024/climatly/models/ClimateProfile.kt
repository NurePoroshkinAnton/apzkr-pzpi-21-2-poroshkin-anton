package com.ua.nure.anton_poroshkin.apz_2024.climatly.models

import kotlinx.serialization.Serializable

@Serializable
data class ClimateProfile(
    val id: String,
    val name: String,
    val temperature: Int,
    val humidity: Int,
    val isActive: Boolean,
    val clientId: String,
)