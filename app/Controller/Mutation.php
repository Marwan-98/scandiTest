<?php

declare(strict_types=1);

namespace App\Controller;

use App\Types\OrderType;
use App\Resolvers\Order\OrderResolver;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Mutation extends ObjectType {
    public function __construct() {
        $orderType = new OrderType();
        
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'createOrder' => [
                    'type' => Type::string(),
                    'args' => [
                        'cartData' => [
                            'type' => $orderType
                        ],
                    ],
                    'resolve' => function ($rootValue, $args) {
                        $orderResolver = new OrderResolver();
                        $order_id = $orderResolver->resolve($rootValue, $args);
                        
                        return "Order created with the id ".$order_id;
                    }
                ],
            ],
        ]);
    }
}