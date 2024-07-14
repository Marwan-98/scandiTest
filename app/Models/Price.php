<?php

declare(strict_types=1);

namespace App\Models;

class Price extends Model {
    public function getProductPrice(string $productId): bool|array|null
    {
        $stmt = $this->database->prepare("SELECT amount, currency_id FROM price where product_id = ?");
        $stmt->bind_param("s", $productId);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
    }
}