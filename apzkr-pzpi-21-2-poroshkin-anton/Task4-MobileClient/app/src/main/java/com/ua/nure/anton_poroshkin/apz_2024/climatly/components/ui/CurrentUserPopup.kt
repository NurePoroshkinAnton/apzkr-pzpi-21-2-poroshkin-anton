package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.ui

import android.util.Log
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.AccountCircle
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.ua.nure.anton_poroshkin.apz_2024.climatly.R
import com.ua.nure.anton_poroshkin.apz_2024.climatly.context.auth.LocalAuthStateViewModel


@Composable
fun CurrentUserPopup() {
    var expanded by remember { mutableStateOf(false) }
    val authStateViewModel = LocalAuthStateViewModel.current
    val authState = authStateViewModel.authState.collectAsState()

    fun handleSingoutClick() {
        authStateViewModel.clearAuthState()
        authStateViewModel.didLogout = true
    }

    TextButton(
        onClick = { expanded = true },
        modifier = Modifier.size(30.dp),
        contentPadding = PaddingValues(5.dp)
    ) {
        Icon(Icons.Outlined.AccountCircle, null, modifier = Modifier.size(25.dp))
        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            DropdownMenuItem(
                text = { Text(authState.value.client?.name ?: "") },
                onClick = { })
            HorizontalDivider()
            DropdownMenuItem(
                text = { Text(stringResource(R.string.signout)) },
                onClick = { handleSingoutClick() })
        }
    }
}