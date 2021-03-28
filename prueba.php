<?php
require('system/core/autoload.php');

$router = new Router();

echo '<pre>';
print_r($router->getUri());
echo '</pre>';

$controlador = $router->getController();
$method = $router->getMethod();
$param = $router->getParam();

echo "Controlador: {$controlador} </br>";
echo "Método: {$method} </br>";
echo "Param: {$param}";

$controller = new $controlador();
$controller->$method();
?>