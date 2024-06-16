package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.auth

import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.HttpRoutes
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.auth.dto.AccessTokenDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.Client
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.headers
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url

class AuthApi(private val httpClient: HttpClient) : IAuthApi {
    override suspend fun signinClient(googleJwt: String): String {
        val response = httpClient.post {
            url("${HttpRoutes.AUTH}/signin/google")
            setBody(AccessTokenDto(googleJwt))
        }

        val accessTokenResponse: AccessTokenDto = response.body()
        return accessTokenResponse.accessToken
    }

    override suspend fun getClientProfile(token: String): Client {
        val response = httpClient.get {
            url("${HttpRoutes.AUTH}/profile/client")
            headers {
                append("Authorization", "Bearer $token")
            }
        }

        return response.body()
    }
}