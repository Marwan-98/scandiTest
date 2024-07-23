<?php

declare(strict_types=1);

namespace App\Models;

class Product extends Model {
    public function getAll(): array
    {
        $query = "SELECT * FROM product";

        $categoryId = func_get_arg(0);
        
        if ($categoryId !== "1") {
            $query .= " WHERE category_id = ?";
        }

        $stmt = $this->database->prepare($query);

        if ($categoryId !== "1") {
            $stmt->bind_param('s', $categoryId);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $products = [];

        while ($product = $result->fetch_assoc()) {
            $products[] = $product;
        }

        return $products;
    }

    public function getById(string $id, ?int $first = null): array
    {
        $stmt = $this->database->prepare("SELECT * FROM product WHERE id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
    }
}