<?php

declare(strict_types=1);

namespace App\Types;

use App\Resolvers\ItemResolver;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'type' => Type::string(),
                'items' => [
                    'type' => Type::listOf(new ItemType()),
                    'resolve' => function ($attribute) {
                        $itemResolver = new ItemResolver();

                        return $itemResolver->getAttributeItems($attribute['product_id'], $attribute['id']);
                    }
                ]
            ]
        ]);
    }
}