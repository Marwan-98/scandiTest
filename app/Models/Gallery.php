<?php

declare(strict_types=1);

namespace App\Models;

class Gallery extends Model {
    public function getById(string $productId, ?int $first = null): array
    {
        $query = "SELECT id, product_id, url FROM gallery WHERE product_id = ?";

        if ($first !== null) {
            $query .= " LIMIT ?";
        }
        
        $stmt = $this->database->prepare($query);

        if ($first !== null) {
            $stmt->bind_param('si', $productId, $first);
        } else {
            $stmt->bind_param('s', $productId);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();

        $gallery = [];

        while ($image = $result->fetch_assoc()) {
            $gallery[] = $image["url"];
        }

        return $gallery;
    }
}