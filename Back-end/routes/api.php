<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\ServiceRequestController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route:: middleware(['auth:sanctum'])->prefix("business")->group(function () {
Route::get('/getbusiness', [BusinessController::class, 'getBusiness']);
Route::post('/createbusiness', [BusinessController::class, 'createBusiness']);
Route::put('/updatebusiness/{id}', [BusinessController::class, 'updateBusiness']);
Route::delete('/deletebusiness/{id}', [BusinessController::class, 'deleteBusiness']);
});
Route::prefix("user")->group(function () {
    Route::get('/getusers', [UserController::class, 'getUsers']);
    Route::post('/createuser', [UserController::class, 'createUser']);
    Route::get('/finduser/{user}', [UserController::class, 'findUser']);
    Route::put('/edituser/{user}', [UserController::class, 'editUser']);
    Route::patch('/toggleactiveuser/{user}', [UserController::class, 'toggleActiveUser']);
    Route::delete('/deleteuser/{user}', [UserController::class, 'deleteUser']);
});
Route::prefix("session")->group(function () {
    Route::get('/getsession', [SessionController::class, 'getSessions']);
    Route::post('/createsession', [SessionController::class, 'createSession']);
});
Route::prefix("ServiceRequest")->group(function () {
    Route::get('/get', [ServiceRequestController::class, 'index']);
    Route::post('/create', [ServiceRequestController::class, 'store']);
    Route::patch('/updateStatus/{serviceRequest}', [ServiceRequestController::class, 'updateStatus']);
});