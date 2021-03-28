<?php
/* Necesario incluir el fichero de conexion a la BBDD */
require_once("./conexionBBDD.php");
session_start();

/* Obtenemos el campo que hemos pasado desde JQuery */
$nif = $_POST['nif'];

/* Crecamos la conexion y lanzamos la consulta previamente diseñada */
$conexion = new conexionBBDD();

$statement = $conexion->getSolicitudes($nif);
$datosPersona = $statement->fetchAll();

if ($datosPersona != null)
    echo json_encode($datosPersona);

/* Al terminar cerramos la conexion */
$conexion->desconectar();
