<?php

namespace App\Controller;
use App\Config\Database;

use App\Resolvers\CategoryResolver;
use App\Resolvers\ProductResolver;
use App\Types\CategoryType;
use App\Types\OrderType;
use GraphQL\GraphQL as GraphQLBase;
use App\Types\ProductType;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use http\Exception\RuntimeException;
use Throwable;

class GraphQL {
    static public function handle(): bool|string
    {
        try {
            $productType = new ProductType();
            $categoryType = new CategoryType();
            $orderType = new OrderType();

            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'products' => [
                        'type' => Type::listOf($productType),
                        'args' => [
                            'categoryId' => ['type' => Type::string()],
                        ],
                        'resolve' => function($root, $args) {
                            $productModel = new ProductResolver();
                            return $productModel->resolveProducts($args["categoryId"]);
                        },
                    ],
                    'product' => [
                        'type' => $productType,
                        'args' => [
                            'id' => ['type' => Type::nonNull(Type::string())],
                        ],
                        'resolve' => function($rootValue, $args) {
                            $productModel = new ProductResolver();
                            return $productModel->resolveProductById($args['id']);
                        }
                    ],
                    'categories' => [
                        'type' => Type::listOf($categoryType),
                        'resolve' => function($rootValue, $args) {
                            $categoryResolver = new CategoryResolver();

                            return $categoryResolver->resolveCategories();
                        }
                    ],
                    'category' => [
                        'type' => $categoryType,
                        'args' => [
                            'id' => ['type' => Type::nonNull(Type::string())],
                        ],
                        'resolve' => function($rootValue, $args) {
                            $categoryResolver = new CategoryResolver();

                            return $categoryResolver->resolveCategoryById($args["id"]);
                        }
                    ]
                ],
            ]);


            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'createOrder' => [
                        'type' => Type::string(),
                        'args' => [
                            'cartData' => [
                                'type' => $orderType
                            ],
                        ],
                        'resolve' => function ($rootValue, $args) {
                            $db = new DataBase();
                            

                            $stmt = $db->prepare("INSERT INTO orders (total) VALUES (?)");
                            $stmt->bind_param('d', $args['cartData']['total']);
                            $stmt->execute();
                            $orderId = $stmt->insert_id;

                            $order_item_stmt = $db->prepare("INSERT INTO order_item (order_id, product_id, attributes, quantity) VALUES (?, ?, ?, ?)");

                            foreach ($args['cartData']['orderItems'] as $orderProduct) {
                                $productAttributes = json_encode($orderProduct['selectedAttributes']);

                                $order_item_stmt->bind_param('issi', $orderId, $orderProduct['productId'], $productAttributes, $orderProduct['quantity']);
                                $order_item_stmt->execute();
                            }


                            return "Hello World!";
                        }
                    ],
                ],
            ]);

            // See docs on schema options:
            // https://webonyx.github.io/graphql-php/schema-definition/#configuration-options
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}