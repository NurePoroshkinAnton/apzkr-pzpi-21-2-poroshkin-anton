package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.auth

import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import com.ua.nure.anton_poroshkin.apz_2024.climatly.components.ui.LocalePicker

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuthTopBar() {
    TopAppBar(title = { Text(text = "") }, actions = {
        LocalePicker()
    })
}