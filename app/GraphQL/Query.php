<?php

declare(strict_types=1);

namespace App\GraphQL;

use App\GraphQL\Resolvers\Category\CategoryResolver;
use App\GraphQL\Resolvers\Category\AllCategoryResolver;
use App\GraphQL\Resolvers\Product\AllProductsResolver;
use App\GraphQL\Resolvers\Product\ProductResolver;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\ProductType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Query extends ObjectType {
    public function __construct() {
        $productType = new ProductType();
        $categoryType = new CategoryType();
        
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'categoryId' => ['type' => Type::string()],
                    ],
                    'resolve' => function($root_value, $args) {
                        $productModel = new AllProductsResolver();
                        return $productModel->resolve($root_value, $args);
                    },
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => function($rootValue, $args) {
                        $productModel = new ProductResolver();
                        return $productModel->resolve($rootValue, $args);
                    }
                ],
                'categories' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => function($rootValue, $args) {
                        $categoryResolver = new AllCategoryResolver();

                        return $categoryResolver->resolve($rootValue, $args);
                    }
                ],
                'category' => [
                    'type' => $categoryType,
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => function($rootValue, $args) {
                        $categoryResolver = new CategoryResolver();

                        return $categoryResolver->resolve($rootValue, $args);
                    }
                ]
            ],
        ]);
    }
}