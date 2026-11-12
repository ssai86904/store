<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    // Mirrors frontend/src/lib/sampleProducts.js so the app looks the same with or without the API.
    public function run(): void
    {
        Product::truncate();

        $products = [
            [
                'name' => 'Basmati Rice 5kg',
                'description' => 'Aged long-grain basmati rice, ideal for biryani and pulao.',
                'price' => 649,
                'stock' => 40,
                'category' => 'Grocery',
            ],
            [
                'name' => 'Cold-Pressed Coconut Oil 1L',
                'description' => 'Single-origin coconut oil, extracted without heat.',
                'price' => 420,
                'stock' => 25,
                'category' => 'Grocery',
            ],
            [
                'name' => 'Organic Honey 500g',
                'description' => 'Raw, unprocessed honey from forest apiaries.',
                'price' => 349,
                'stock' => 60,
                'category' => 'Grocery',
            ],
            [
                'name' => 'Wireless Earbuds',
                'description' => 'Bluetooth 5.3 earbuds with 24-hour battery life with the case.',
                'price' => 1999,
                'stock' => 15,
                'category' => 'Electronics',
            ],
            [
                'name' => 'Power Bank 10000mAh',
                'description' => 'Slim power bank with USB-C fast charging.',
                'price' => 1299,
                'stock' => 30,
                'category' => 'Electronics',
            ],
            [
                'name' => 'Smart LED Bulb',
                'description' => '9W colour-changing bulb you can control from your phone.',
                'price' => 499,
                'stock' => 80,
                'category' => 'Electronics',
            ],
            [
                'name' => 'USB-C Fast Charger',
                'description' => '30W wall charger for phones and tablets.',
                'price' => 899,
                'stock' => 0,
                'category' => 'Electronics',
            ],
            [
                'name' => 'Cotton Casual T-Shirt',
                'description' => 'Soft 100% cotton crew-neck tee.',
                'price' => 599,
                'stock' => 100,
                'category' => 'Fashion',
            ],
            [
                'name' => 'Denim Jacket',
                'description' => 'Classic mid-wash denim jacket with a regular fit.',
                'price' => 2499,
                'stock' => 12,
                'category' => 'Fashion',
            ],
            [
                'name' => 'Running Shoes',
                'description' => 'Lightweight breathable shoes with a cushioned sole.',
                'price' => 2999,
                'stock' => 18,
                'category' => 'Fashion',
            ],
            [
                'name' => 'Ceramic Coffee Mug Set',
                'description' => 'Set of four 300ml stoneware mugs.',
                'price' => 799,
                'stock' => 35,
                'category' => 'Home',
            ],
            [
                'name' => 'Bamboo Storage Basket',
                'description' => 'Handwoven basket for laundry, toys or blankets.',
                'price' => 549,
                'stock' => 22,
                'category' => 'Home',
            ],
            [
                'name' => 'Indoor Plant Pot',
                'description' => 'Matte ceramic planter with a drainage tray.',
                'price' => 399,
                'stock' => 45,
                'category' => 'Home',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
