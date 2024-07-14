<?php

declare(strict_types=1);

namespace App\Resolvers;

use App\Models\Attribute as AttributeModel;

class AttributeResolver {
    public function resolveProductAttributes(string $productId): array
    {
        $attributeModel = new AttributeModel();

        return $attributeModel->getProductAttributes($productId);
    }
}