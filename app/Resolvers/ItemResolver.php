<?php

declare(strict_types=1);

namespace App\Resolvers;

use App\Models\Item as ItemModel;

class ItemResolver {
    public function getAttributeItems($productId, $attributeId): array {
        $itemModel = new ItemModel();

        return $itemModel->getAttributeItems($productId, $attributeId);
    }
}