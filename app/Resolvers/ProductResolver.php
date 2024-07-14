<?php

declare(strict_types=1);

namespace App\Resolvers;

use App\Models\Product as ProductModel;

class ProductResolver {
    private ProductModel $product;

    public function __construct()
    {
        $this->product = new ProductModel();
    }

    public function resolveProducts(): array
    {
        return $this->product->getProducts();
    }

    public function resolveProductById(string $productId): array
    {
        return $this->product->getProductById($productId);
    }
}