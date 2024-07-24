<?php

declare(strict_types=1);

namespace App\Models;

class Category extends Model {
    public function get_all(): array
    {
        $stmt = $this->database->prepare('SELECT * FROM category');
        $stmt->execute();

        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function get_by_id(string $category_id, ?int $first = null) {
        $stmt = $this->database->prepare("SELECT * FROM category WHERE id = ?");
        $stmt->bind_param("s", $category_id);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
    }
}