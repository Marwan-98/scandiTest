<?php

declare(strict_types=1);

namespace App\Models;

class Product extends Model {
    public function getProducts(): array
    {
        $result = $this->database->query("SELECT * FROM product");
        $products = [];

        while ($product = $result->fetch_assoc()) {
            $product["gallery"] = json_decode($product["gallery"]);
            $products[] = $product;
        }

        return $products;
    }

    public function getProductById(string $id): array
    {
        $stmt = $this->database->prepare("SELECT * FROM product WHERE id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();

        $product = $stmt->get_result()->fetch_assoc();
        $product["gallery"] = json_decode($product["gallery"]);

        return $product;
    }
}