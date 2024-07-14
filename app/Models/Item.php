<?php

declare(strict_types=1);

namespace App\Models;

class Item extends Model {
    public function getAttributeItems(string $productId, string $attributeId): array {
        $stmt = $this->database->prepare('SELECT value.id, value.displayValue, value.value
            FROM value
            INNER JOIN product_attribute_value 
            ON value.id = product_attribute_value.item_id
            WHERE product_attribute_value.product_id = ?
            AND product_attribute_value.attribute_id = ?');
        $stmt->bind_param('ss', $productId, $attributeId);
        $stmt->execute();

        $result = $stmt->get_result();

        $items = [];

        while ($item = $result->fetch_assoc()) {
            $items[] = ['id' => $item['id'], 'displayValue' => $item['displayValue'], 'value' => $item['value']];
        }

        return $items;
    }
}