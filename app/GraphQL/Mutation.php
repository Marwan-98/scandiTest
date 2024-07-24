<?php

declare(strict_types=1);

namespace App\GraphQL;

use App\GraphQL\Types\OrderType;
use App\GraphQL\Resolvers\Order\OrderResolver;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Mutation extends ObjectType {
    public function __construct() {
        $order_type = new OrderType();
        
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'createOrder' => [
                    'type' => Type::string(),
                    'args' => [
                        'cartData' => [
                            'type' => $order_type
                        ],
                    ],
                    'resolve' => function ($root_value, $args) {
                        $orderResolver = new OrderResolver();
                        $order_id = $orderResolver->resolve($root_value, $args);
                        
                        return "Order created with the id ".$order_id;
                    }
                ],
            ],
        ]);
    }
}