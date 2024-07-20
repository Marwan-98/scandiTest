<?php

declare(strict_types=1);

namespace App\Resolvers;

use App\Models\Gallery;

class GalleryResolver {
    public function resolveProductGallery(string $productId, ?int $first): array {
        $galleryModel = new Gallery();

        return $galleryModel->getById($productId, $first);
    }
}