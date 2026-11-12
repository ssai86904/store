<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    // Rebuilds the (in-memory SQLite) database before each test, so tests don't affect each other.
    use RefreshDatabase;

    public function test_it_lists_products(): void
    {
        Product::factory()->count(3)->create();

        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonCount(3, 'data');
    }

    public function test_it_filters_products_by_search_term(): void
    {
        Product::factory()->create(['name' => 'Basmati Rice']);
        Product::factory()->create(['name' => 'Denim Jacket']);

        $this->getJson('/api/products?search=rice')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Basmati Rice');
    }

    public function test_it_shows_a_single_product(): void
    {
        $product = Product::factory()->create();

        $this->getJson("/api/products/{$product->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $product->id);
    }

    public function test_it_returns_404_for_a_missing_product(): void
    {
        $this->getJson('/api/products/999')->assertNotFound();
    }

    public function test_it_creates_a_product(): void
    {
        $payload = [
            'name' => 'Test Mug',
            'description' => 'A mug used in a test.',
            'price' => 199.5,
            'stock' => 10,
            'category' => 'Home',
        ];

        $this->postJson('/api/products', $payload)
            ->assertCreated()
            ->assertJsonPath('data.name', 'Test Mug');

        $this->assertDatabaseHas('products', ['name' => 'Test Mug', 'category' => 'Home']);
    }

    public function test_it_validates_input_when_creating(): void
    {
        $this->postJson('/api/products', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'price', 'stock', 'category']);
    }

    public function test_it_deletes_a_product(): void
    {
        $product = Product::factory()->create();

        $this->deleteJson("/api/products/{$product->id}")->assertNoContent();

        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }
}
