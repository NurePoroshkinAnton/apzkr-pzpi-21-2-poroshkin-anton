package com.ua.nure.anton_poroshkin.apz_2024.climatly.context.auth

import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.Client

data class AuthState(
    val isAuthenticated: Boolean,
    val accessToken: String? = null,
    val client: Client? = null
)