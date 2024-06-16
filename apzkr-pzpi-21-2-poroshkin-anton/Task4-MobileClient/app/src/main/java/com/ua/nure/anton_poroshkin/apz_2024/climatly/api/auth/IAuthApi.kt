package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.auth

import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.Client

interface IAuthApi {
    suspend fun signinClient(googleJwt: String): String

    suspend fun getClientProfile(token: String): Client
}