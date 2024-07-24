<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\SelectedAttributeType;

class OrderItemType extends InputObjectType {
    public function __construct() {
        $selected_attributes = new SelectedAttributeType();

        parent::__construct([
            'name' => 'OrderItem',
            'fields' => [
                'productId' => Type::string(),
                'quantity' => Type::int(),
                'selectedAttributes' => Type::listOf($selected_attributes)
            ]
        ]);
    }
}