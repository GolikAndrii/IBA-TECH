<?php 

require 'AltoRouter.php';
$router = new AltoRouter();


$router->map('GET','/',  function() {
    require __DIR__ . '/index.html';
});

$router->map('POST','/email',  function() {
    if($_POST["sendTo"] && $_POST["message"]) {
        mail($_POST["sendTo"], "IBA Tech Academy", $_POST["message"]);
        $response = ["status" => "Success", "text" => "send!"];
        echo json_encode($response);
    }
});

$router->map('GET','/backend',  function() {
    require __DIR__ . '/backend.html';
});

$router->map('GET','/frontend',  function() {
    require __DIR__ . '/frontend.html';
});


$router->map('GET','/en/',  function(  ) {
    require __DIR__ . '/en/index.html';
} , 'en');

$router->map('GET','/en/backend',  function(  ) {
    require __DIR__ . '/en/backend.html';
} , 'en/backend');

$router->map('GET','/en/frontend',  function(  ) {
    require __DIR__ . '/en/frontend.html';
} , 'en/frontend');


$router->map('GET','/ru/',  function(  ) {
    require __DIR__ . '/ru/index.html';
} , 'ru');

$router->map('GET','/ru/backend',  function(  ) {
    require __DIR__ . '/ru/backend.html';
} , 'ru/backend');

$router->map('GET','/ru/frontend',  function(  ) {
    require __DIR__ . '/ru/frontend.html';
} , 'ru/frontend');

/*
$router->map('GET','/ru/frontend',  function(  ) {
    require __DIR__ . '/ru/frontend.html';
} , 'frontend');*/
/*

$router->map('GET','/en/',  function() {
    require __DIR__ . '/en/index.html';
}, 'en');

$router->map('GET','/en/backend',  function() {
    require __DIR__ . '/en/backend.html';
}, 'en');

$router->map('GET','/en/frontend',  function() {
    require __DIR__ . '/en/frontend.html';
}, 'en');


$router->map('GET','/ru',  function() {
    require __DIR__ . '/ru/index.html';
});

$router->map('GET','/ru/backend',  function() {
    require __DIR__ . '/ru/backend.html';
});

$router->map('GET','/ru/frontend',  function() {
    require __DIR__ . '/ru/frontend.html';
});
*/
// match current request
$match = $router->match();

if( $match && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] ); 
} else {
    // no route was matched
    header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
