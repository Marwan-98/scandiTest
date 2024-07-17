<?php

declare(strict_types=1);

namespace App\Models;

class Product extends Model {
    public function getProducts(string $categoryId): array
    {
        $stmt = $this->database->prepare("SELECT * FROM product WHERE category_id = ?");
        $stmt->bind_param('s', $categoryId);
        $stmt->execute();
        $result = $stmt->get_result();

        $products = [];

        while ($product = $result->fetch_assoc()) {
            $products[] = $product;
        }

        return $products;
    }

    public function getProductById(string $id): array
    {
        $stmt = $this->database->prepare("SELECT * FROM product WHERE id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
    }
}