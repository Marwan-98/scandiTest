<?php

function route($uri)
{
    $routes = [
        '' => 'home',
        'about' => 'about',
        'contact' => 'contact',
    ];

    if (array_key_exists($uri, $routes)) {
        call_user_func($routes[$uri]);
    } else {
        echo '404 - Not Found Fuckface';
    }
}

function home()
{
    echo 'This is the home page';
}

function about()
{
    echo 'This is the about page';
}

function contact()
{
    echo 'This is the contact page';
}
