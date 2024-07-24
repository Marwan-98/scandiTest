<?php

declare(strict_types=1);

namespace App\Models;

class Gallery extends Model {
    public function get_by_id(string $product_id, ?int $first = null): array
    {
        $query = "SELECT id, product_id, url FROM gallery WHERE product_id = ?";

        if ($first !== null) {
            $query .= " LIMIT ?";
        }
        
        $stmt = $this->database->prepare($query);

        if ($first !== null) {
            $stmt->bind_param('si', $product_id, $first);
        } else {
            $stmt->bind_param('s', $product_id);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();

        $gallery = [];

        while ($image = $result->fetch_assoc()) {
            $gallery[] = $image["url"];
        }

        return $gallery;
    }

    public function get_all() {
        $query = "SELECT id, product_id, url FROM gallery";
        $result = $this->database->query($query);

        return $result;
    }
}