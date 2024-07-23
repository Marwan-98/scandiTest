<?php

declare(strict_types=1);

namespace App\Resolvers\Gallery;

use App\Resolvers\Resolver;
use App\Models\Gallery as GalleryModel;

class GalleryResolver extends Resolver {
    public function __construct()
    {
        $gallery_model = new GalleryModel();
        
        parent::__construct($gallery_model);
    } 

    public function resolve($root_value, $args): array {
        $product_id = $root_value["id"];
        $first = $args["first"] ?? null;

        return $this->model->getById($product_id, $first);
    }
}