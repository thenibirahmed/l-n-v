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

    public function getAllPosts(): JsonResponse
    {
        return response()->json([
            'posts' => Blog::with('category')->latest()->paginate(50),
        ]);
    }

    public function addNewPost(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'category_id' => 'required|exists:categories,id',
        ]);

        $post = Blog::create([
            'user_id' => 1,
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
        ]);

        return response()->json([
            'post' => $post,
        ]);
    }
}
