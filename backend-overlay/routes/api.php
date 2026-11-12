<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

// Every route in this file is automatically prefixed with /api and uses the "api" middleware group.
//
// apiResource registers five routes in one line:
//   GET    /api/products             index
//   POST   /api/products             store
//   GET    /api/products/{product}   show
//   PUT    /api/products/{product}   update
//   DELETE /api/products/{product}   destroy
//
// NOTE: write endpoints are open here to keep the demo simple. In a real app, wrap them in
// Route::middleware('auth:sanctum')->group(...) so only logged-in users can change data.
Route::apiResource('products', ProductController::class);
