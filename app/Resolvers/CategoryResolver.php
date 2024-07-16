<?php

declare(strict_types=1);

namespace App\Resolvers;

use App\Models\Category as CategoryModel;

class CategoryResolver {
    public function resolveCategories(): array {
        $categoryModel = new CategoryModel();

        return $categoryModel->getCategories();
    }
}