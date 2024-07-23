<?php

declare(strict_types=1);

namespace App\Models;

class Price extends Model {
    public function getById(string $productId, ?int $first = null): array
    {
        $stmt = $this->database->prepare("SELECT amount, currency_id FROM price where product_id = ?");
        $stmt->bind_param("s", $productId);
        $stmt->execute();
        
        $result = $stmt->get_result();

        $prices = [];

        while($price_data = $result->fetch_assoc()) {
            $prices[] = $price_data;
        }

        return $prices;
    }

    public function getAll() {
        $query = "SELECT * FROM price";
        $result = $this->database->query($query);

        return $result;
    }
}