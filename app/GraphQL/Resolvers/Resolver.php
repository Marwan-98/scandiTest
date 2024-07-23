<?php

declare(strict_types=1);

namespace App\GraphQL\Resolvers;

use App\Models\Model;

abstract class Resolver {
    protected Model $model;
    
    public function __construct(Model $model) {
        $this->model = $model;
    }

    abstract public function resolve($root_value, $args);
}
