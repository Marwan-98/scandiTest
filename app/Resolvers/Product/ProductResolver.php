<?php

declare(strict_types=1);

namespace App\Resolvers\Product;

use App\Resolvers\Resolver;
use App\Models\Product as ProductModel;

class ProductResolver extends Resolver {
    private ProductModel $product;

    public function __construct()
    {
        $this->product = new ProductModel();
    }

    public function resolve($root_value, $args): array
    {
        $product_id = $args['id'];

        return $this->product->getById($product_id);
    }
}