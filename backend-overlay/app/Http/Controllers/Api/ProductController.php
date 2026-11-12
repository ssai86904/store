<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    // GET /api/products?search=rice&category=Grocery
    public function index(Request $request)
    {
        $products = Product::query()
            ->when($request->query('search'), fn ($query, $search) => $query->where('name', 'like', "%{$search}%"))
            ->when($request->query('category'), fn ($query, $category) => $query->where('category', $category))
            ->orderBy('id')
            ->get();

        return ProductResource::collection($products); // wrapped as { "data": [...] }
    }

    // POST /api/products
    public function store(Request $request): JsonResponse
    {
        $product = Product::create($this->validated($request));

        return (new ProductResource($product))->response()->setStatusCode(201);
    }

    // GET /api/products/{product}
    // Route model binding: Laravel loads the Product for {product}, or returns 404 automatically.
    public function show(Product $product): ProductResource
    {
        return new ProductResource($product);
    }

    // PUT/PATCH /api/products/{product}
    public function update(Request $request, Product $product): ProductResource
    {
        $product->update($this->validated($request, partial: true));

        return new ProductResource($product);
    }

    // DELETE /api/products/{product}
    public function destroy(Product $product): Response
    {
        $product->delete();

        return response()->noContent(); // 204
    }

    // Invalid input makes validate() throw, and Laravel turns that into a 422 JSON response
    // with the error messages, so there is no manual if/else here.
    private function validated(Request $request, bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'name' => [$required, 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'price' => [$required, 'numeric', 'min:0'],
            'stock' => [$required, 'integer', 'min:0'],
            'category' => [$required, 'string', 'max:60'],
        ]);
    }
}
