<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Eloquent model: one Product object = one row in the `products` table.
// Laravel infers the table name (`products`) from the class name.
class Product extends Model
{
    use HasFactory;

    // Mass assignment protection: only these columns can be filled via create()/update().
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
        ];
    }
}
