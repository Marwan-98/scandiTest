<?php

namespace App\GraphQL\Resolvers\Price;

use App\GraphQL\Resolvers\Resolver;
use App\Models\Price as PriceModel;

class PriceResolver extends Resolver {
    public function __construct()
    {
        $price_model = new PriceModel();
        
        parent::__construct($price_model);
    }   

    public function resolve($root_value, $args): array {
        $product_id = $root_value["id"];

        return $this->model->get_by_id($product_id);
    }
}