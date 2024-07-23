<?php

namespace App\Resolvers\Price;

use App\Resolvers\Resolver;
use App\Models\Price as PriceModel;

class PriceResolver extends Resolver {
    public function resolve($root_value, $args): array {
        $product_id = $root_value["id"];
        $price_model = new PriceModel();

        return $price_model->getById($product_id);
    }
}