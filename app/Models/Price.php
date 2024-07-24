<?php

declare(strict_types=1);

namespace App\Models;

class Price extends Model {
    public function get_by_id(string $product_id, ?int $first = null): array
    {
        $stmt = $this->database->prepare("SELECT amount, currency_id FROM price where product_id = ?");
        $stmt->bind_param("s", $product_id);
        $stmt->execute();
        
        $result = $stmt->get_result();

        $prices = [];

        while($price_data = $result->fetch_assoc()) {
            $prices[] = $price_data;
        }

        return $prices;
    }

    public function get_all() {
        $query = "SELECT * FROM price";
        $result = $this->database->query($query);

        return $result;
    }
}