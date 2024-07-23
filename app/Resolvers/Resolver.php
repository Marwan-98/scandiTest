<?php

declare(strict_types=1);

namespace App\Resolvers;

abstract class Resolver {
    abstract public function resolve($root_value, $args);
}
