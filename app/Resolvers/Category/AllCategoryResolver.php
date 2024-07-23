<?php

declare(strict_types=1);

namespace App\Resolvers\Category;

use App\Resolvers\Resolver;
use App\Models\Category as CategoryModel;

class AllCategoryResolver extends Resolver {
    private CategoryModel $category;

    public function __construct()
    {
        $this->category = new CategoryModel();
    }
    
    public function resolve($root_value, $args): array {
        return $this->category->getCategories();
    }
}