<?php
require __DIR__ . '/vendor/autoload.php';

use App\Controller\GraphQL;

if (isset($_SERVER['HTTP_ORIGIN'])) {
    // allow all origins
    header("Access-Control-Allow-Origin: *");
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit(0);
}

$graphQL = new GraphQL();

echo $graphQL->handle();
