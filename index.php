<?php

require __DIR__ . '/vendor/autoload.php';

use App\GraphQL\Controller as GraphQLController;

if (isset($_SERVER['HTTP_ORIGIN'])) {
    // allow all origins
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$graphQL = new GraphQLController();

echo $graphQL->handle();
