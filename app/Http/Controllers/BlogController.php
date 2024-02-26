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

    public function getSinglePosts($id): JsonResponse
    {
        return response()->json([
            'post' => Blog::with('category')->find($id),
        ]);
    }

    public function updatePost(Request $request, $id): JsonResponse
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'category_id' => 'required|exists:categories,id',
        ]);

        $post = Blog::find($id);

        $post->update([
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
        ]);

        return response()->json([
            'post' => [
                'title' => $post->title,
                'content' => $post->content,
                'category_id' => $post->category_id,
            ],
        ]);
    }

    public function deletePost($id): JsonResponse
    {
        $post = Blog::find($id);

        $post->delete();

        return response()->json([
            'deleted' => true,
            'message' => 'Post deleted successfully',
        ]);
    }
}
