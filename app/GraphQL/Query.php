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
        $product_type = new ProductType();
        $category_type = new CategoryType();
        
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($product_type),
                    'args' => [
                        'categoryId' => ['type' => Type::string()],
                    ],
                    'resolve' => function($root_value, $args) {
                        $productModel = new AllProductsResolver();
                        return $productModel->resolve($root_value, $args);
                    },
                ],
                'product' => [
                    'type' => $product_type,
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => function($root_value, $args) {
                        $productModel = new ProductResolver();
                        return $productModel->resolve($root_value, $args);
                    }
                ],
                'categories' => [
                    'type' => Type::listOf($category_type),
                    'resolve' => function($root_value, $args) {
                        $categoryResolver = new AllCategoryResolver();

                        return $categoryResolver->resolve($root_value, $args);
                    }
                ],
                'category' => [
                    'type' => $category_type,
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => function($root_value, $args) {
                        $categoryResolver = new CategoryResolver();

                        return $categoryResolver->resolve($root_value, $args);
                    }
                ]
            ],
        ]);
    }
}