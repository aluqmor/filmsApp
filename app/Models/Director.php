<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Director extends Model
{
    protected $fillable = ['name'];

    public function films()
    {
        return $this->hasMany(Film::class);
    }
}