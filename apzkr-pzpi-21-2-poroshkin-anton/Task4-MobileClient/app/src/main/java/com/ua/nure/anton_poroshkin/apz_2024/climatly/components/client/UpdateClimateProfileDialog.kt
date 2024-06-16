package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.UpdateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile
import com.ua.nure.anton_poroshkin.apz_2024.climatly.R

@Composable
fun UpdateClimateProfileDialog(
    onDismiss: () -> Unit,
    onUpdate: (UpdateClimateProfileDto) -> Unit,
    initialValues: ClimateProfile
) {
    var name by remember { mutableStateOf(initialValues.name) }
    var temperature by remember { mutableStateOf(initialValues.temperature.toString()) }
    var humidity by remember { mutableStateOf(initialValues.humidity.toString()) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(text = stringResource(R.string.update_climate_profile)) },

        text = {
            Column {
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text(stringResource(R.string.name)) })
                Spacer(modifier = Modifier.height(12.dp))
                OutlinedTextField(
                    value = temperature,
                    onValueChange = { temperature = it },
                    label = { Text("${stringResource(R.string.temperature)} (°C)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                )
                Spacer(modifier = Modifier.height(12.dp))
                OutlinedTextField(
                    value = humidity,
                    onValueChange = { humidity = it },
                    label = { Text("${stringResource(R.string.humidity)} (%)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                )
            }
        },

        confirmButton = {
            TextButton(onClick = {
                val updateDto = UpdateClimateProfileDto(
                    name = name,
                    temperature = temperature.toIntOrNull() ?: 0,
                    humidity = humidity.toIntOrNull() ?: 0,
                )
                onUpdate(updateDto)
            }) {
                Text(stringResource(R.string.update))
            }
        },

        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text(stringResource(R.string.cancel))
            }
        }
    )
}