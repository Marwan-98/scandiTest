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

    public function resolveProducts(string $categoryId): array
    {
        return $this->product->getProducts($categoryId);
    }

    public function resolveProductById(string $productId): array
    {
        return $this->product->getById($productId);
    }
}