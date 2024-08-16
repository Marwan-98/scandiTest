<?php

declare(strict_types=1);

namespace App\Models;

class Product extends Model {
    public function get_all(): array
    {
        $query = "SELECT * FROM product";

        $category_name = func_get_arg(0);
        $category_id = null;
        
        if ($category_name !== "all") {
            $category_stmt = $this->database->prepare("SELECT id FROM category WHERE name = ?");
            $category_stmt->bind_param('s', $category_name);
            $category_stmt->execute();
            $category_result = $category_stmt->get_result();
            $category = $category_result->fetch_assoc();
            $category_id = $category["id"];

            $query .= " WHERE category_id = ?";
        }

        $stmt = $this->database->prepare($query);

        if ($category_name !== "all") {
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