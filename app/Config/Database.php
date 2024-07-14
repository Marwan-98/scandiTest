<?php

namespace App\Config;

use Exception;
use mysqli;

class DatabaseException extends Exception
{
}

class Database extends Mysqli {
    /**
     * @var string
     */
    private string $servername = "127.0.0.1";

    /**
     * @var string
     */
    private string $username = "root";

    /**
     * @var string
     */
    private string $password = 'xcJUBDq*Li4$YZ';

    /**
     * @var string
     */
    private string $dbname = "SCANDI_TEST";

    /**
     * @throws DatabaseException
     */
    public function __construct() {
        // Create connection
        parent::__construct($this->servername, $this->username, $this->password, $this->dbname);

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