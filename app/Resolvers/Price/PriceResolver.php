<?php

namespace App\Resolvers\Price;

use App\Resolvers\Resolver;
use App\Models\Price as PriceModel;

class PriceResolver extends Resolver {
    public function __construct()
    {
        $price_model = new PriceModel();
        
        parent::__construct($price_model);
    }   

    public function resolve($root_value, $args): array {
        $product_id = $root_value["id"];

        return $this->model->getById($product_id);
    }
}