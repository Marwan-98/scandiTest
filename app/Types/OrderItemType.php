<?php

declare(strict_types=1);

namespace App\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;
use App\Types\SelectedAttributeType;

class OrderItemType extends InputObjectType {
    public function __construct() {
        $selectedAttributes = new SelectedAttributeType();

        parent::__construct([
            'name' => 'OrderItem',
            'fields' => [
                'productId' => Type::string(),
                'quantity' => Type::int(),
                'selectedAttributes' => Type::listOf($selectedAttributes)
            ]
        ]);
    }
}