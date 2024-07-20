<?php

declare(strict_types=1);

namespace App\Models;

use App\Config\Database;

abstract class Model {
    protected Database $database;

    public function __construct()
    {
        $this->database = new Database();
    }

    abstract public function getById(string $id, ?int $first);
}