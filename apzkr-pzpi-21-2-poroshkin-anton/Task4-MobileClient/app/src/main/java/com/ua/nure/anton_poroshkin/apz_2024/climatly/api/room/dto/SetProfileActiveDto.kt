package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.room.dto

import kotlinx.serialization.Serializable

@Serializable
data class SetProfileActiveDto(
    val roomId: String?,
    val profileId: String,
    val isActive: Boolean
)