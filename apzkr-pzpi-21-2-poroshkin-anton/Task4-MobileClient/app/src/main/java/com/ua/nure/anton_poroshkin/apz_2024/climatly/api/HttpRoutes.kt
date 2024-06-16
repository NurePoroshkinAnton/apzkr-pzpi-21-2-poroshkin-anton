package com.ua.nure.anton_poroshkin.apz_2024.climatly.api

import com.ua.nure.anton_poroshkin.apz_2024.climatly.API_BASE_URL

object HttpRoutes {
    private const val BASE_URL = API_BASE_URL
    const val AUTH = "$BASE_URL/auth"
    const val CLIMATE_PROFILES = "$BASE_URL/climate-profiles"
    const val ROOMS = "$BASE_URL/rooms"
}