<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    // php artisan db:seed  (or: php artisan migrate --seed)
    public function run(): void
    {
        $this->call(ProductSeeder::class);
    }
}
