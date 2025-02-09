<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\DirectorController;

Route::get('/', function () {
    return view('index');
});

// Uso prefix para agrupar las rutas de la API
Route::prefix('api')->group(function () {
    Route::apiResource('films', FilmController::class);
    Route::apiResource('directors', DirectorController::class)->only(['index', 'store']);
});