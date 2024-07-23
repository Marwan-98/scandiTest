<?php

declare(strict_types=1);

namespace App\Resolvers\Currency;

use App\Resolvers\Resolver;
use App\Models\Currency as CurrencyModel;

class CurrencyResolver extends Resolver{
    private CurrencyModel $currency;

    public function __construct()
    {
        $this->currency = new CurrencyModel();
    }

    public function resolve($root_value, $args): array
    {
        $price_id = $root_value['currency_id'];

        return $this->currency->getById($price_id);
    }
}