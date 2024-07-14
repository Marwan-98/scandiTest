<?php

declare(strict_types=1);

namespace App\Models;

class Attribute extends Model {
    public function getProductAttributes($productId): array {
        $stmt = $this->database->prepare('SELECT
            attribute.id,
            attribute.name,
            attribute.type,
            attribute_set.product_id
                FROM attribute_set
                INNER JOIN attribute
                ON attribute_set.attribute_id=attribute.id
                and attribute_set.product_id = ?'
        );
        $stmt->bind_param('s', $productId);
        $stmt->execute();
        $result = $stmt->get_result();

        $attributes = [];

        while ($attribute = $result->fetch_assoc()) {
            $attributes[] = ['id' => $attribute['id'], 'name' => $attribute['name'], 'type' => $attribute['type'], 'product_id' => $attribute['product_id']];
        }

        return $attributes;
    }
}