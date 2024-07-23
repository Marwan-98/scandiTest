<?php

declare(strict_types=1);

namespace App\Resolvers\Gallery;

use App\Resolvers\Resolver;
use App\Models\Gallery;

class GalleryResolver extends Resolver {
    private Gallery $gallery;

    public function __construct()
    {
        $this->gallery = new Gallery();
    }

    public function resolve($root_value, $args): array {
        $product_id = $root_value["id"];
        $first = $args["first"] ?? null;

        return $this->gallery->getById($product_id, $first);
    }
}