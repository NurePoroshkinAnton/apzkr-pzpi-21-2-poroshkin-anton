package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.ui

import androidx.appcompat.app.AppCompatDelegate
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.core.os.LocaleListCompat
import com.ua.nure.anton_poroshkin.apz_2024.climatly.R


@Composable
fun LocalePicker() {
    var expanded by remember { mutableStateOf(false) }

    fun handleSelectLocale(locale: LocaleListCompat) {
        AppCompatDelegate.setApplicationLocales(locale)
        expanded = false
    }

    TextButton(
        onClick = { expanded = true },
        modifier = Modifier.size(30.dp),
        contentPadding = PaddingValues(5.dp)
    ) {
        Icon(Icons.Outlined.Settings, null, modifier = Modifier.size(25.dp))
        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            DropdownMenuItem(
                text = { Text(stringResource(R.string.select_language)) },
                onClick = { })
            HorizontalDivider()
            DropdownMenuItem(
                text = { Text(stringResource(R.string.english)) },
                onClick = { handleSelectLocale(LocaleListCompat.forLanguageTags("en")) })
            DropdownMenuItem(
                text = { Text(stringResource(R.string.ukrainian)) },
                onClick = { handleSelectLocale(LocaleListCompat.forLanguageTags("uk")) })
        }
    }
}