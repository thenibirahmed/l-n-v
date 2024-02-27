<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('categories', [CategoryController::class, 'getAllCategories']);

Route::get('get-latest-post', [BlogController::class, 'getLatestPost']);

Route::get('posts', [BlogController::class, 'getAllPosts']);

Route::post('posts', [BlogController::class, 'addNewPost']);

Route::get('post/{id}', [BlogController::class, 'getSinglePosts']);

Route::patch('post/{id}', [BlogController::class, 'updatePost']);

Route::delete('post/{id}', [BlogController::class, 'deletePost']);

Route::post('category', [CategoryController::class, 'addNewCategory']);

Route::patch('category/{id}', [CategoryController::class, 'updateCategory']);

Route::delete('category/{id}', [CategoryController::class, 'deleteCategory']);
