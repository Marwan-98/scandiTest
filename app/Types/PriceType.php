<?php

declare(strict_types=1);

namespace App\Types;

use App\Resolvers\Currency\CurrencyResolver;
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
                    'resolve' => function($root_value, $args) {
                        $currencyResolver = new CurrencyResolver();

                        return $currencyResolver->resolve($root_value, $args);
                    }
                ]
            ],
        ]);
    }
}