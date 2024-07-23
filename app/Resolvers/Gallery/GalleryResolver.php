<?php

declare(strict_types=1);

namespace App\Resolvers\Gallery;

use App\Resolvers\Resolver;
use App\Models\Gallery;

class GalleryResolver extends Resolver {
    public function resolve($root_value, $args): array {
        $product_id = $root_value["id"];
        $first = $args["first"] ?? null;

        $gallery_model = new Gallery();

        return $gallery_model->getById($product_id, $first);
    }
}