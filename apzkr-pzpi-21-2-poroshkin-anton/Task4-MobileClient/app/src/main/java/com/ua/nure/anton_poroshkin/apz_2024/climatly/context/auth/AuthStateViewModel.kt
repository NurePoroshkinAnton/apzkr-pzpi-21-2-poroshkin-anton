package com.ua.nure.anton_poroshkin.apz_2024.climatly.context.auth

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.Client
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class AuthStateViewModel : ViewModel() {
    private val _authState = MutableStateFlow(AuthState(isAuthenticated = false))
    val authState: StateFlow<AuthState> = _authState
    var didLogout by mutableStateOf(false)

    fun setAuthState(isAuthenticated: Boolean, accessToken: String?, client: Client?) {
        _authState.value = AuthState(isAuthenticated, accessToken, client)
    }

    fun clearAuthState() {
        _authState.value = AuthState(isAuthenticated = false)
    }
}