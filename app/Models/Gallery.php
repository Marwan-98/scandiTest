<?php

declare(strict_types=1);

namespace App\Models;

class Gallery extends Model {
    public function getProductGallery(string $productId): array
    {
        $stmt = $this->database->prepare("SELECT id, product_id, url FROM gallery WHERE product_id = ?");
        $stmt->bind_param('s', $productId);
        $stmt->execute();
        $result = $stmt->get_result();

        $gallery = [];

        while ($image = $result->fetch_assoc()) {
            $gallery[] = $image["url"];
        }

        return $gallery;
    }
}