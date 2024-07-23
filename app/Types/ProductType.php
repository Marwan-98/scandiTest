<?php

declare(strict_types=1);

namespace App\Types;

use App\Resolvers\Attribute\AttributeResolver;
use App\Resolvers\Gallery\GalleryResolver;
use App\Resolvers\Price\PriceResolver;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;


class ProductType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'inStock' => Type::int(),
                'gallery' => [
                    'type' => Type::listOf(Type::string()),
                    'args' => [
                        'first' => ['type' => Type::int()],
                    ],
                    'resolve' => function ($root_value, $args) {
                        $gallery_resolver = new GalleryResolver();

                        return $gallery_resolver->resolve($root_value, $args);
                    }
                ],
                'description' => Type::string(),
                'attributes' => [
                    'type' => Type::listOf(new AttributeType()),
                    'resolve' => function($root_value, $args) {
                        $attributeResolver = new AttributeResolver();
                        
                        return $attributeResolver->resolve($root_value, $args);
                    }
                ],
                'brand' => Type::string(),
                'prices' => [
                    'type' => Type::listOf(new PriceType()),
                    'resolve' => function($root_value, $args) {
                        $price_resolver = new PriceResolver();

                        return $price_resolver->resolve($root_value, $args);
                    }
                ]
            ],
        ]);
    }
}