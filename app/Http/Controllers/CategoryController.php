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

    public function addNewCategory(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'category' => $category,
        ]);
    }

    public function updateCategory(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $category = Category::find($id);
        $category->name = $request->name;
        $category->save();

        return response()->json([
            'category' => $category,
        ]);
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);
        $category->delete();

        return response()->json([
            'deleted' => true,
            'message' => 'Category deleted successfully',
        ]);
    }
}
