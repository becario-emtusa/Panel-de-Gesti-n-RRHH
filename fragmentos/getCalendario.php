<?php
/* Necesario incluir el fichero de conexion a la BBDD */
require_once("./conexionBBDD.php");
session_start();

/* Obtenemos el campo que hemos pasado desde JQuery */
$dni = $_POST['dni'];
$tipoLicencia = $_POST['tipoLicencia'];

/* Crecamos la conexion y lanzamos la consulta previamente diseñada */
$conexion = new conexionBBDD();

if (!isset($_POST['admin'])) {
    $statement = $conexion->getCalendarioUsuario($dni, $tipoLicencia, 0);
} else {
    $statement = $conexion->getCalendarioUsuario($dni, $tipoLicencia, 1);
}
$datosCalendario = $statement->fetchAll();

/* Si el resultado contiene un resultado, lo devolvemos */
if ($datosCalendario != null) {
    echo json_encode($datosCalendario);
}

/* Al terminar cerramos la conexion */
$conexion->desconectar();
