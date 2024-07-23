<?php

declare(strict_types=1);

namespace App\GraphQL\Resolvers\Attribute;

use App\GraphQL\Resolvers\Resolver;
use App\Models\Attribute as AttributeModel;

class AttributeResolver extends Resolver {
    public function __construct()
    {
        $attribute_model = new AttributeModel();
        
        parent::__construct($attribute_model);
    } 

    public function resolve($root_value, $args): array
    {
        $product_id = $root_value["id"];

        return $this->model->getById($product_id);
    }
}