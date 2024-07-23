<?php

declare(strict_types=1);

namespace App\Resolvers\Product;

use App\Resolvers\Resolver;
use App\Models\Product as ProductModel;

class AllProductsResolver extends Resolver {
    private ProductModel $product;

    public function __construct()
    {
        $this->product = new ProductModel();
    }

    public function resolve($root_value, $args): array
    {
        $category_id = $args["categoryId"];

        return $this->product->getProducts($category_id);
    }
}