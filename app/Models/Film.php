<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    protected $fillable = ['title', 'date', 'rating', 'director_id'];

    public function director()
    {
        return $this->belongsTo(Director::class);
    }
}