package com.ua.nure.anton_poroshkin.apz_2024.climatly.models

import kotlinx.serialization.Serializable

@Serializable
data class Room(
    val id: String,
    val number: Int,
    val clients: List<Client>
)