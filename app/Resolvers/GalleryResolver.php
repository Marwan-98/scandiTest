<?php

declare(strict_types=1);

namespace App\Resolvers;

use App\Models\Gallery;

class GalleryResolver {
    public function resolveProductGallery(string $productId): array {
        $galleryModel = new Gallery();

        return $galleryModel->getProductGallery($productId);
    }
}