package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import android.annotation.SuppressLint
import android.util.Log
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.room.dto.SetProfileActiveDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.context.auth.LocalAuthStateViewModel
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.Client
import com.ua.nure.anton_poroshkin.apz_2024.climatly.R


@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun ClimateProfilesScreen(climateProfilesViewModel: ClimateProfilesViewModel = viewModel()) {
    val authStateViewModel = LocalAuthStateViewModel.current
    val authState = authStateViewModel.authState.collectAsState()
    val client = authState.value.client
    val climateProfiles = climateProfilesViewModel.climateProfiles
    val isLoading = climateProfilesViewModel.isLoading
    val isCreating = climateProfilesViewModel.isCreating
    val selectedProfileId = climateProfilesViewModel.selectedClimateProfile
    val selectedProfile = climateProfiles.find { profile -> profile.id === selectedProfileId }

    LaunchedEffect(true) {
        climateProfilesViewModel.accessToken = authState.value.accessToken

        climateProfilesViewModel.getAll()
        if (client?.roomId != null) {
            climateProfilesViewModel.getActiveProfile(client.roomId)
        }
    }

    Scaffold(
        topBar = { ClientTopBar() },
        floatingActionButton = {
            FloatingActionButton(
                content = { Icon(Icons.Filled.Add, null) },
                onClick = { climateProfilesViewModel.isCreating = true }
            )
        }

    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            if (isLoading) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center
                ) {
                    CircularProgressIndicator(
                        modifier = Modifier.width(64.dp),
                        color = MaterialTheme.colorScheme.secondary,
                        trackColor = MaterialTheme.colorScheme.surfaceVariant,
                    )
                }
            } else {
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = stringResource(R.string.climate_profiles),
                            style = MaterialTheme.typography.headlineMedium
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        TextButton(
                            onClick = { climateProfilesViewModel.handleRefreshClick() },
                            modifier = Modifier.size(30.dp),
                            contentPadding = PaddingValues(5.dp)
                        ) {
                            Icon(Icons.Filled.Refresh, null, modifier = Modifier.size(25.dp))
                        }
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .horizontalScroll(rememberScrollState())
                    ) {
                        climateProfiles.forEach { profile ->
                            ClimateProfileCard(
                                climateProfile = profile,
                                onUpdateClick = { id ->
                                    climateProfilesViewModel.selectedClimateProfile = id
                                },
                                onRemoveClick = { id ->
                                    climateProfilesViewModel.handleRemoveClick(id)
                                },
                                onActivateClick = { profileToActivate ->
                                    Log.i("DEBUG", "${client?.roomId}")
                                    val dto = SetProfileActiveDto(
                                        client?.roomId,
                                        profileToActivate.id,
                                        !profileToActivate.isActive
                                    )
                                    climateProfilesViewModel.handleUpdateProfileClick(dto)
                                }
                            )
                        }
                    }
                }
            }
        }

        if (isCreating) {
            CreateClimateProfileDialog(
                onDismiss = { climateProfilesViewModel.isCreating = false },
                onCreate = { profile ->
                    climateProfilesViewModel.handleCreateClick(profile)
                })
        }

        if (selectedProfileId != null && selectedProfile != null) {
            UpdateClimateProfileDialog(
                onDismiss = { climateProfilesViewModel.selectedClimateProfile = null },
                initialValues = selectedProfile,
                onUpdate = { profile ->
                    climateProfilesViewModel.handleUpdateClick(selectedProfileId, profile)
                })
        }
    }
}