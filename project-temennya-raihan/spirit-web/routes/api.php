<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RealtimeChartController;
use App\Http\Controllers\ChartLogic;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('chart', [RealtimeChartController::class, 'areaChart'])->name('api.chart');

Route::get('chart2', [RealtimeChartController::class, 'areaChart2'])->name('api.chart2');

Route::get('chart3', [RealtimeChartController::class, 'areaChart3'])->name('api.chart3');

Route::get('chart4', [RealtimeChartController::class, 'areaChart4'])->name('api.chart4');

Route::get('chart5', [RealtimeChartController::class, 'areaChart5'])->name('api.chart5');

Route::get('chart6', [RealtimeChartController::class, 'areaChart6'])->name('api.chart6');
Route::get('chart7', [ChartLogic::class, 'getData1'])->name('api.chart7');
Route::get('chart8', [ChartLogic::class, 'getData2'])->name('api.chart8');
Route::get('chart9', [ChartLogic::class, 'getData3'])->name('api.chart9');
Route::get('chart10', [ChartLogic::class, 'getData4'])->name('api.chart10');
