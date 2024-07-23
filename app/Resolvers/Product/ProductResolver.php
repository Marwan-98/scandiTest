<?php

declare(strict_types=1);

namespace App\Resolvers\Product;

use App\Resolvers\Resolver;
use App\Models\Product as ProductModel;

class ProductResolver extends Resolver {
    public function __construct()
    {
        $product_model = new ProductModel();
        
        parent::__construct($product_model);
    }   

    public function resolve($root_value, $args): array
    {
        $product_id = $args['id'];

        return $this->model->getById($product_id);
    }
}