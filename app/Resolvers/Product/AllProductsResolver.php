<?php

declare(strict_types=1);

namespace App\Resolvers\Product;

use App\Resolvers\Resolver;
use App\Models\Product as ProductModel;

class AllProductsResolver extends Resolver {
    public function __construct()
    {
        $product_model = new ProductModel();
        
        parent::__construct($product_model);
    }   

    public function resolve($root_value, $args): array
    {
        $category_id = $args["categoryId"];

        return $this->model->getAll($category_id);
    }
}