<?php

declare(strict_types=1);

namespace App\Types;

use App\Resolvers\CurrencyResolver;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::float(),
                'currency' => [
                    'type' => new CurrencyType(),
                    'resolve' => function($price) {
                        $currencyResolver = new CurrencyResolver();

                        return $currencyResolver->resolveCurrency($price['currency_id']);
                    }
                ]
            ],
        ]);
    }
}