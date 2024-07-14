<?php
require __DIR__ . '/vendor/autoload.php';

use App\Controller\GraphQL;


//$uri = trim($_SERVER['REQUEST_URI'], '/');
//
//$rawInput = file_get_contents('php://input');
//
//print_r($rawInput);
//
//route($uri);

$graphQL = new GraphQL();

echo $graphQL->handle();
