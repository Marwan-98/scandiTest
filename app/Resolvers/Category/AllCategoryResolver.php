<?php

declare(strict_types=1);

namespace App\Resolvers\Category;

use App\Resolvers\Resolver;
use App\Models\Category as CategoryModel;

class AllCategoryResolver extends Resolver {
    public function resolve($root_value, $args): array {
        $category_model = new CategoryModel();

        return $category_model->getCategories();
    }
}