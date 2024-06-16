package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.auth

import android.annotation.SuppressLint
import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.auth0.android.jwt.JWT
import com.ua.nure.anton_poroshkin.apz_2024.climatly.R
import com.ua.nure.anton_poroshkin.apz_2024.climatly.context.auth.LocalAuthStateViewModel

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun AuthScreen(authViewModel: AuthViewModel = viewModel()) {
    val context = LocalContext.current
    val authStateViewModel = LocalAuthStateViewModel.current

    LaunchedEffect(authViewModel.accessToken) {
        val token = authViewModel.accessToken

        if (authStateViewModel.didLogout) {
            authViewModel.accessToken = null
            authStateViewModel.didLogout = false
            return@LaunchedEffect
        }

        if (token !== null) {
            val payload = JWT(authViewModel.accessToken!!)
            val clientId = payload.getClaim("sub").asString() ?: ""

            if (clientId.isEmpty()) {
                throw Exception("Received a malformed JWT token")
            }

            val client = authViewModel.getClientProfile(token)
            Log.i("DEBUG", client.name)

            authStateViewModel.setAuthState(
                isAuthenticated = true,
                accessToken = token,
                client = client
            )
        } else {
            authStateViewModel.setAuthState(false, null, null)
        }
    }


    Scaffold(topBar = { AuthTopBar() }) {
        Box(
            modifier = Modifier
                .fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = stringResource(R.string.welcome),
                    style = MaterialTheme.typography.headlineLarge,
                    modifier = Modifier.padding(bottom = 16.dp)
                )
                Button(onClick = {
                    authViewModel.handleLoginClick(context)
                }, enabled = !authViewModel.isLoading) {
                    Text(text = stringResource(R.string.signin_with_google))
                }
            }
        }
    }
}