<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BusinessController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::prefix("business")->group(function () {
Route::get('/getbusiness', [BusinessController::class, 'getBusiness']);
Route::post('/createbusiness', [BusinessController::class, 'createBusiness']);
Route::put('/updatebusiness/{id}', [BusinessController::class, 'updateBusiness']);
Route::delete('/deletebusiness/{id}', [BusinessController::class, 'deleteBusiness']);
});