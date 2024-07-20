<?php

namespace App\Resolvers;

use App\Models\Price as PriceModel;

class PriceResolver {
    public function resolveProductPrice($productId): array {
        $priceModel = new PriceModel();

        return $priceModel->getById($productId);
    }
}