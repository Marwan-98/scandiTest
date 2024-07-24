<?php

namespace App\Config;

use Exception;
use mysqli;

class DatabaseException extends Exception
{
}

class Database extends Mysqli {
    /**
     * @throws DatabaseException
     */
    public function __construct() {
        // Create connection
        parent::__construct($_ENV["DB_SERVER_NAME"], $_ENV["USER_NAME"], $_ENV["PASSWORD"], $_ENV["DB_NAME"]);

        $this->throwConnectionExceptionOnConnectionError();
    }

    /**
     * @throws DatabaseException
     */
    private function throwConnectionExceptionOnConnectionError(): void
    {

        if (!$this->connect_error) return;

        $message = sprintf('(%s) %s', $this->connect_errno, $this->connect_error);

        throw new DatabaseException($message);
    }
}