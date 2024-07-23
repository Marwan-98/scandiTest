<?php

declare(strict_types=1);

namespace App\GraphQL\Resolvers\Category;

use App\GraphQL\Resolvers\Resolver;
use App\Models\Category as CategoryModel;

class CategoryResolver extends Resolver {
    public function __construct()
    {
        $category_model = new CategoryModel();
        
        parent::__construct($category_model);
    } 

    public function resolve($rootValue, $args): array {
        $category_id = $args["id"];

        return $this->model->getById($category_id);
    }
}