<?php
namespace App\Http\Controllers;

use App\Models\Director;
use Illuminate\Http\Request;

class DirectorController extends Controller
{
    public function index()
    {
        return response()->json(Director::all());
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255'
            ]);

            $director = Director::create($validated);
            
            return response()->json($director, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating director: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}