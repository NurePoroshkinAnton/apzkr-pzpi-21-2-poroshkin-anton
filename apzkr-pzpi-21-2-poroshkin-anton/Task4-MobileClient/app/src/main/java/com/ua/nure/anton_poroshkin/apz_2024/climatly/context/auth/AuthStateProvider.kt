package com.ua.nure.anton_poroshkin.apz_2024.climatly.context.auth

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.lifecycle.viewmodel.compose.viewModel

val LocalAuthStateViewModel =
    staticCompositionLocalOf<AuthStateViewModel> { error("No AuthViewModel provided") }

@Composable
fun AuthStateProvider(content: @Composable () -> Unit) {
    val authStateViewModel: AuthStateViewModel = viewModel()
    CompositionLocalProvider(LocalAuthStateViewModel provides authStateViewModel) {
        content()
    }
}