<?php

declare(strict_types=1);

namespace App\Resolvers\Attribute;

use App\Resolvers\Resolver;
use App\Models\Attribute as AttributeModel;

class AttributeResolver extends Resolver {
    private AttributeModel $attribute;

    public function __construct()
    {
        $this->attribute = new AttributeModel();
    }

    public function resolve($root_value, $args): array
    {
        $product_id = $root_value["id"];

        return $this->attribute->getById($product_id);
    }
}