<?php
namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index(Request $request)
    {
        $query = Film::with('director');
        
        if ($request->has('sort')) {
            $query->orderBy('title', $request->sort);
        }
        
        if ($request->has('director_id')) {
            $query->where('director_id', $request->director_id);
        }
        
        $films = $query->paginate(6);
        return response()->json($films);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|integer',
            'rating' => 'required|integer|min:1|max:10',
            'director_id' => 'required|exists:directors,id'
        ]);

        $film = Film::create($validated);
        return response()->json($film->load('director'));
    }

    public function update(Request $request, Film $film)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|integer',
            'rating' => 'required|integer|min:1|max:10',
            'director_id' => 'required|exists:directors,id'
        ]);

        $film->update($validated);
        return response()->json($film->load('director'));
    }

    public function destroy(Film $film)
    {
        $film->delete();
        return response()->json(['message' => 'Film deleted']);
    }
}