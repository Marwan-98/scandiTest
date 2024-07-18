<?php

declare(strict_types=1);

namespace App\Models;

class Category extends Model {
    public function getCategories(): array
    {
        $stmt = $this->database->prepare('SELECT * FROM category');
        $stmt->execute();

        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function getCategoryById(string $categoryId) {
        $stmt = $this->database->prepare("SELECT * FROM category WHERE id = ?");
        $stmt->bind_param("s", $categoryId);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
    }
}