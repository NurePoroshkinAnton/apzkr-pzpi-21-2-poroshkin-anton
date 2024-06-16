package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.ClimateProfileApi
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.CreateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.UpdateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.room.RoomApi
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.room.dto.SetProfileActiveDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.defaultRequest
import io.ktor.client.request.headers
import io.ktor.serialization.kotlinx.json.json
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json

class ClimateProfilesViewModel : ViewModel() {
    private val client = HttpClient(CIO) {
        defaultRequest {
            headers {
                append("ngrok-skip-browser-warning", "true")
                append("Content-Type", "application/json")
            }
        }

        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
            })
        }
    }

    private val climateProfileApi = ClimateProfileApi(client)
    private val roomApi = RoomApi(client)

    private var _climateProfiles by mutableStateOf(emptyList<ClimateProfile>())
    private var _isLoading by mutableStateOf(false)
    private var _isCreating by mutableStateOf(false)
    private var _selectedClimateProfile by mutableStateOf<String?>(null)
    private var _activeProfile by mutableStateOf<ClimateProfile?>(null)
    private var _isActivatingProfile by mutableStateOf(false)
    private var _accessToken by mutableStateOf<String?>(null)

    val climateProfiles: List<ClimateProfile>
        get() {
            return _climateProfiles
        }

    val isLoading: Boolean
        get() {
            return _isLoading
        }

    var isCreating: Boolean
        get() {
            return _isCreating
        }
        set(value) {
            _isCreating = value
        }

    var selectedClimateProfile: String?
        get() {
            return _selectedClimateProfile
        }
        set(value) {
            _selectedClimateProfile = value
        }

    var activeProfile: ClimateProfile?
        get() {
            return _activeProfile
        }
        set(value) {
            _activeProfile = value
        }

    var isActivatingProfile: Boolean
        get() {
            return _isActivatingProfile
        }
        set(value) {
            _isActivatingProfile = value
        }

    var accessToken: String?
        get() {
            return _accessToken
        }
        set(value) {
            _accessToken = value
        }

    suspend fun getAll() {
        try {
            _isLoading = true
            val climateProfiles = climateProfileApi.getAll(accessToken!!)
            _climateProfiles = climateProfiles
            _isLoading = false
        } catch (e: Exception) {
            Log.e("FETCH CLIMATE PROFILES", "$e")
        }
    }

    suspend fun addProfile(dto: CreateClimateProfileDto) {
        try {
            _isLoading = true
            climateProfileApi.create(dto, accessToken!!)
            _climateProfiles = climateProfileApi.getAll(accessToken!!)
            _isLoading = false
            _isCreating = false
        } catch (e: Exception) {
            Log.e("CREATE CLIMATE PROFILE", "$e")
        }
    }

    suspend fun updateProfile(id: String, dto: UpdateClimateProfileDto) {
        try {
            _isLoading = true
            climateProfileApi.update(id, dto, accessToken!!)
            _climateProfiles = climateProfileApi.getAll(accessToken!!)
            _isLoading = false
            _selectedClimateProfile = null
        } catch (e: Exception) {
            Log.e("UPDATE CLIMATE PROFILE", "$e")
        }
    }

    suspend fun removeProfile(id: String) {
        try {
            _isLoading = true
            climateProfileApi.delete(id, accessToken!!)
            _climateProfiles = climateProfileApi.getAll(accessToken!!)
            _isLoading = false
        } catch (e: Exception) {
            Log.e("UPDATE CLIMATE PROFILE", "$e")
        }
    }

    suspend fun getActiveProfile(roomId: String): ClimateProfile? {
        var activeProfile: ClimateProfile? = null

        try {
            _isLoading = true
            activeProfile = roomApi.getActiveProfile(roomId)
            _isLoading = false
        } catch (e: Exception) {
            Log.e("GET ACTIVE CLIMATE PROFILE", "$e")
        }

        return activeProfile
    }

    suspend fun setProfileStatus(dto: SetProfileActiveDto) {
        try {
            _isLoading = true
            roomApi.setProfileActive(dto)
            _climateProfiles = climateProfileApi.getAll(accessToken!!)
            _isLoading = false
        } catch (e: Exception) {
            Log.e("UPDATE CLIMATE PROFILE", "$e")
        }
    }

    fun handleUpdateProfileClick(dto: SetProfileActiveDto) {
        viewModelScope.launch {
            setProfileStatus(dto)
        }
    }

    fun handleRefreshClick() {
        viewModelScope.launch {
            getAll()
        }
    }

    fun handleCreateClick(dto: CreateClimateProfileDto) {
        viewModelScope.launch {
            addProfile(dto)
        }
    }

    fun handleUpdateClick(id: String, dto: UpdateClimateProfileDto) {
        viewModelScope.launch {
            updateProfile(id, dto)
        }
    }

    fun handleRemoveClick(id: String) {
        viewModelScope.launch {
            removeProfile(id)
        }
    }
}