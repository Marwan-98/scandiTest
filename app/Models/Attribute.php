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
                AND attribute_set.product_id = ?'
        );
        $stmt->bind_param('s', $productId);
        $stmt->execute();
        $result = $stmt->get_result();

        $attributes = [];

        while ($attribute = $result->fetch_assoc()) {
            $item_stmt = $this->database->prepare('SELECT value.id, value.displayValue, value.value
            FROM value
            INNER JOIN product_attribute_value 
            ON value.id = product_attribute_value.item_id
            WHERE product_attribute_value.product_id = ?
            AND product_attribute_value.attribute_id = ?');

            $item_stmt->bind_param('ss', $productId, $attribute['id']);
            $item_stmt->execute();
            $item_result = $item_stmt->get_result();

            
            $items = [];

            while ($item = $item_result->fetch_assoc()) {
                $items[] = ['id' => $item['id'], 'displayValue' => $item['displayValue'], 'value' => $item['value']];
            }

            $attributes[] = [
                'id' => $attribute['id'],
                'name' => $attribute['name'],
                'type' => $attribute['type'],
                'product_id' => $attribute['product_id'],
                'items' => $items,
            ];
        }

        return $attributes;
    }
}