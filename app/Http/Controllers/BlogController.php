<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function getLatestPost(): JsonResponse
    {
        return response()->json([
            'post' => Blog::latest()->first(),
        ]);
    }
}
