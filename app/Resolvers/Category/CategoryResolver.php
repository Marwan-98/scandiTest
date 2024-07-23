<?php

declare(strict_types=1);

namespace App\Resolvers\Category;

use App\Resolvers\Resolver;
use App\Models\Category as CategoryModel;

class CategoryResolver extends Resolver {
    public function resolve($rootValue, $args): array {
        $category_id = $args["id"];
        $category_model = new CategoryModel();

        return $category_model->getById($category_id);
    }
}