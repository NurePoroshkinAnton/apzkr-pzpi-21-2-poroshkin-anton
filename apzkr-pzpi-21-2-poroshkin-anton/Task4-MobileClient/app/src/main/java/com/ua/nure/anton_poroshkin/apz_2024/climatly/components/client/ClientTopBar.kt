package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.ua.nure.anton_poroshkin.apz_2024.climatly.components.ui.CurrentUserPopup
import com.ua.nure.anton_poroshkin.apz_2024.climatly.components.ui.LocalePicker

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ClientTopBar() {
    TopAppBar(title = { Text(text = "") }, actions = {
        LocalePicker()
        CurrentUserPopup()
    })
}