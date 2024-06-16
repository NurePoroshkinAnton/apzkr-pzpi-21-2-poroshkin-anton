package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile
import com.ua.nure.anton_poroshkin.apz_2024.climatly.R

@Composable
fun ClimateProfileCard(
    climateProfile: ClimateProfile,
    onUpdateClick: (id: String) -> Unit,
    onRemoveClick: (id: String) -> Unit,
    onActivateClick: (profile: ClimateProfile) -> Unit
) {
    OutlinedCard(
        modifier = Modifier
            .padding(8.dp)
            .width(300.dp)
            .height(300.dp),
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(horizontalArrangement = Arrangement.End, modifier = Modifier.fillMaxWidth()) {
                TextButton(
                    onClick = { onUpdateClick(climateProfile.id) },
                    modifier = Modifier.size(30.dp),
                    contentPadding = PaddingValues(5.dp)
                ) {
                    Icon(Icons.Filled.Edit, null, modifier = Modifier.size(25.dp))
                }
                TextButton(
                    onClick = { onRemoveClick(climateProfile.id) },
                    modifier = Modifier.size(30.dp),
                    contentPadding = PaddingValues(5.dp)
                ) {
                    Icon(Icons.Filled.Delete, null, modifier = Modifier.size(25.dp))
                }
            }
            Text(
                text = climateProfile.name,
                style = MaterialTheme.typography.headlineSmall
            )
            Spacer(modifier = Modifier.size(12.dp))
            Text(text = "${stringResource(R.string.temperature)}: ${climateProfile.temperature}°C")
            Text(text = "${stringResource(R.string.humidity)}: ${climateProfile.humidity}%")
            Text(
                text = "${stringResource(R.string.status)}: ${
                    if (climateProfile.isActive) stringResource(
                        R.string.active
                    ) else stringResource(R.string.inactive)
                }"
            )
            Spacer(modifier = Modifier.weight(1f))
            Row(horizontalArrangement = Arrangement.End, modifier = Modifier.fillMaxWidth()) {
                OutlinedButton(
                    onClick = { onActivateClick(climateProfile) },
                ) {
                    Text(
                        text = if (climateProfile.isActive) stringResource(R.string.deactivate) else stringResource(
                            R.string.active
                        )
                    )
                }
            }
        }
    }
}
