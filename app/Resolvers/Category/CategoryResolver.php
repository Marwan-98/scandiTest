<?php

declare(strict_types=1);

namespace App\Resolvers\Category;

use App\Resolvers\Resolver;
use App\Models\Category as CategoryModel;

class CategoryResolver extends Resolver {
    private CategoryModel $category;

    public function __construct()
    {
        $this->category = new CategoryModel();
    }

    public function resolve($rootValue, $args): array {
        $category_id = $args["id"];

        return $this->category->getById($category_id);
    }
}