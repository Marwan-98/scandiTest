<?php

declare(strict_types=1);

namespace App\Types;

use App\Resolvers\AttributeResolver;
use App\Resolvers\PriceResolver;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;


class ProductType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'gallery' => Type::listOf(Type::string()),
                'description' => Type::string(),
                'attributes' => [
                    'type' => Type::listOf(new AttributeType()),
                    'resolve' => function($product) {
                        $attributeResolver = new AttributeResolver();

                        return $attributeResolver->resolveProductAttributes($product["id"]);
                    }
                ],
                'brand' => Type::string(),
                'prices' => [
                    'type' => new PriceType(),
                    'resolve' => function($product) {
                        $priceResolver = new PriceResolver();

                        return $priceResolver->resolveProductPrice($product["id"]);
                    }
                ]
            ],
        ]);
    }
}