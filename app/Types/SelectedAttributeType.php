<?php

declare(strict_types=1);

namespace App\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class SelectedAttributeType extends InputObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'SelectedAttribute',
            'fields' => [
                'id' => Type::string(),
                'itemId' => Type::string(),
            ]
        ]);
    }
}