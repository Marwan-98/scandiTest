<?php

declare(strict_types=1);

namespace App\Types;

use App\Resolvers\AttributeResolver;
use App\Resolvers\GalleryResolver;
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
                    'resolve' => function ($product, $args) {
                        $galleryResolver = new GalleryResolver();

                        return $galleryResolver->resolveProductGallery($product["id"], $args["first"] ?? null);
                    }
                ],
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
                    'type' => Type::listOf(new PriceType()),
                    'resolve' => function($rootValue, $args) {
                        $price_resolver = new PriceResolver();

                        return $price_resolver->resolve($rootValue, $args);
                    }
                ]
            ],
        ]);
    }
}