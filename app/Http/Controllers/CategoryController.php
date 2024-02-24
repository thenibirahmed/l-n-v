<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getAllCategories(): JsonResponse
    {
        return response()->json([
            'categories' => Category::all(),
        ]);
    }
}
