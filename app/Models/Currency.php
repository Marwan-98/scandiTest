<?php

declare(strict_types=1);

namespace App\Models;

class Currency extends Model {
    public function getPriceCurrency($currencyId): array {
        $stmt = $this->database->prepare("SELECT label, symbol FROM currency WHERE id = ?");
        $stmt->bind_param("i", $currencyId);
        $stmt->execute();

        $currency = $stmt->get_result()->fetch_assoc();

        return [
            'label' => $currency['label'],
            'symbol' => $currency['symbol'],
        ];
    }
}