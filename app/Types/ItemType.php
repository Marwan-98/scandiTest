<?php

declare(strict_types=1);

namespace App\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ItemType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'Item',
            'fields' => [
                'id' => Type::string(),
                'value' => Type::string(),
                'displayValue' => Type::string(),
            ]
        ]);
    }
}