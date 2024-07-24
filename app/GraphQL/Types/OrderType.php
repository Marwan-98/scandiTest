<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\OrderItemType;

class OrderType extends InputObjectType {
    public function __construct() {
        $order_item_type = new OrderItemType();

        parent::__construct([
            'name' => 'Order',
            'fields' => [
                'total' => Type::string(),
                'orderItems' => Type::listOf($order_item_type),
            ],
        ]);
    }
}