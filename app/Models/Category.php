<?php

declare(strict_types=1);

namespace App\Models;

class Category extends Model {
    public function getAll(): array
    {
        $stmt = $this->database->prepare('SELECT * FROM category');
        $stmt->execute();

        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function getById(string $categoryId, ?int $first = null) {
        $stmt = $this->database->prepare("SELECT * FROM category WHERE id = ?");
        $stmt->bind_param("s", $categoryId);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
    }
}