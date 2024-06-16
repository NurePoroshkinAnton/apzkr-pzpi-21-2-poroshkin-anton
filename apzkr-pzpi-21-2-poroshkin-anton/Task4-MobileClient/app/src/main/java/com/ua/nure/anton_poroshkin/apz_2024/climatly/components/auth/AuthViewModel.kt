package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.auth

import android.content.Context
import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.credentials.CredentialManager
import androidx.credentials.CustomCredential
import androidx.credentials.GetCredentialRequest
import androidx.credentials.GetCredentialResponse
import androidx.credentials.PublicKeyCredential
import androidx.credentials.exceptions.GetCredentialException
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential
import com.google.android.libraries.identity.googleid.GoogleIdTokenParsingException
import com.ua.nure.anton_poroshkin.apz_2024.climatly.OAUTH_APP_ID
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.auth.AuthApi
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.Client
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.defaultRequest
import io.ktor.client.request.headers
import io.ktor.serialization.kotlinx.json.json
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json

class AuthViewModel : ViewModel() {
    private val client = HttpClient(CIO) {
        defaultRequest {
            headers {
                append("ngrok-skip-browser-warning", "true")
                append("Content-Type", "application/json")
            }
        }

        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
            })
        }
    }

    private val authApi = AuthApi(client)
    var accessToken by mutableStateOf<String?>(null)
    var isLoading by mutableStateOf(false)

    fun handleLoginClick(context: Context) {
        viewModelScope.launch {
            isLoading = true
            val token = signinWithGoogle(context)
            accessToken = token
            isLoading = false
        }
    }

    suspend fun getClientProfile(token: String): Client {
        return authApi.getClientProfile(token)
    }

    private suspend fun signinWithGoogle(context: Context): String {
        val credentialManager = CredentialManager.create(context)

        val googleIdOption: GetGoogleIdOption = GetGoogleIdOption.Builder()
            .setFilterByAuthorizedAccounts(false)
            .setServerClientId(OAUTH_APP_ID)
            .build()

        val request: GetCredentialRequest = GetCredentialRequest.Builder()
            .addCredentialOption(googleIdOption)
            .build()

        var accessToken = ""

        try {
            val response = credentialManager.getCredential(
                request = request,
                context = context,
            )

            val googleJwt = extractGoogleJwt(response)
            accessToken = authApi.signinClient(googleJwt)

        } catch (e: GetCredentialException) {
            Log.e("AuthScreen cred", e.message ?: "")
        } catch (e: Exception) {
            Log.e("AuthScreen", e.message ?: "")
        }

        Log.i("AUTH", "at from backend: $accessToken")
        return accessToken
    }

    private fun extractGoogleJwt(result: GetCredentialResponse): String {
        val credential = result.credential
        var googleJwt: String = ""

        when (credential) {
            is PublicKeyCredential -> {
                googleJwt = credential.authenticationResponseJson
            }

            is CustomCredential -> {
                if (credential.type == GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL) {
                    try {
                        val googleIdTokenCredential = GoogleIdTokenCredential
                            .createFrom(credential.data)

                        googleJwt = googleIdTokenCredential.idToken
                    } catch (e: GoogleIdTokenParsingException) {
                        throw Exception("Received an invalid google id token response")
                    }
                } else {
                    throw Exception("Unexpected type of credential")
                }
            }

            else -> {
                throw Exception("Unexpected type of credential")
            }
        }

        return googleJwt
    }
}