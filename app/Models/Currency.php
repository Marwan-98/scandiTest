<?php

declare(strict_types=1);

namespace App\Models;

class Currency extends Model {
    public function get_by_id($currency_id, ?int $first = null): array {
        $stmt = $this->database->prepare("SELECT label, symbol FROM currency WHERE id = ?");
        $stmt->bind_param("i", $currency_id);
        $stmt->execute();

        $currency = $stmt->get_result()->fetch_assoc();

        return [
            'label' => $currency['label'],
            'symbol' => $currency['symbol'],
        ];
    }

    public function get_all() {
        $query = "SELECT label, symbol FROM currency";
        $result = $this->database->query($query);

        return $result;
    }
}