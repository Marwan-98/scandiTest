<?php

declare(strict_types=1);

namespace App\GraphQL\Resolvers\Currency;

use App\GraphQL\Resolvers\Resolver;
use App\Models\Currency as CurrencyModel;

class CurrencyResolver extends Resolver{
    public function __construct()
    {
        $currency_model = new CurrencyModel();
        
        parent::__construct($currency_model);
    } 

    public function resolve($root_value, $args): array
    {
        $price_id = $root_value['currency_id'];

        return $this->model->get_by_id($price_id);
    }
}