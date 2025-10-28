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
Route::prefix("user")->group(function () {
    Route::get('/getusers', [App\Http\Controllers\UserController::class, 'getUsers']);
    Route::post('/createuser', [App\Http\Controllers\UserController::class, 'createUser']);
    Route::get('/finduser/{user}', [App\Http\Controllers\UserController::class, 'findUser']);
    Route::put('/edituser/{user}', [App\Http\Controllers\UserController::class, 'editUser']);
    Route::patch('/toggleactiveuser/{user}', [App\Http\Controllers\UserController::class, 'toggleActiveUser']);
    Route::delete('/deleteuser/{user}', [App\Http\Controllers\UserController::class, 'deleteUser']);
});