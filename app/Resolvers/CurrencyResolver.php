<?php

declare(strict_types=1);

namespace App\Resolvers;

use App\Models\Currency as CurrencyModel;

class CurrencyResolver {
    public function resolveCurrency($priceId): array
    {
        $currencyModel = new CurrencyModel();

        return $currencyModel->getById($priceId);
    }
}