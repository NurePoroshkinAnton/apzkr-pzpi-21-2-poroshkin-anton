package com.ua.nure.anton_poroshkin.apz_2024.climatly.models

import kotlinx.serialization.Serializable

@Serializable
data class Client(
    val id: String,
    val name: String,
    val email: String,
    val roomId: String?,
)