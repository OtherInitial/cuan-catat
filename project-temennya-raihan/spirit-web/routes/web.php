<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChartController;


Route::get('/', function () {
    return view('welcome');
});
Route::get('/monitoring', function () {
    return view('monitoring');
});

Route::get('/monitoring2', function () {
    return view('monitoring2');
});
