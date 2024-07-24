<?php

declare(strict_types=1);

namespace App\Models;

class Product extends Model {
    public function get_all(): array
    {
        $query = "SELECT * FROM product";

        $category_id = func_get_arg(0);
        
        if ($category_id !== "1") {
            $query .= " WHERE category_id = ?";
        }

        $stmt = $this->database->prepare($query);

        if ($category_id !== "1") {
            $stmt->bind_param('s', $category_id);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $products = [];

        while ($product = $result->fetch_assoc()) {
            $products[] = $product;
        }

        return $products;
    }

    public function get_by_id(string $id, ?int $first = null): array
    {
        $stmt = $this->database->prepare("SELECT * FROM product WHERE id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
    }
}