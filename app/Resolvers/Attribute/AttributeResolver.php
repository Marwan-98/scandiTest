<?php

declare(strict_types=1);

namespace App\Resolvers\Attribute;

use App\Resolvers\Resolver;
use App\Models\Attribute as AttributeModel;

class AttributeResolver extends Resolver {
    public function resolve($root_value, $args): array
    {
        $product_id = $root_value["id"];

        $attribute_model = new AttributeModel();

        return $attribute_model->getById($product_id);
    }
}