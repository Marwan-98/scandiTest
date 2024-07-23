<?php

namespace App\Resolvers\Price;

use App\Resolvers\Resolver;
use App\Models\Price as PriceModel;

class PriceResolver extends Resolver {
    private PriceModel $price;

    public function __construct()
    {
        $this->price = new PriceModel();
    }

    public function resolve($root_value, $args): array {
        $product_id = $root_value["id"];

        return $this->price->getById($product_id);
    }
}