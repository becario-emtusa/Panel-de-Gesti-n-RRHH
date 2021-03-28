<?php
/* Necesario incluir el fichero de conexion a la BBDD */
require_once("./conexionBBDD.php");
session_start();

/* Obtenemos el campo que hemos pasado desde JQuery */
$idDepartamento = $_POST['idDepartamento'];
$idLicencia = $_POST['idLicencia'];
$fecha = $_POST['fecha'];

$insertar = false;

if (!isset($_POST['numDias']) && !isset($_POST['concesion'])) {
    $numDiasMod = -1;
    $concesion = 0;
} else {
    $numDiasMod = $_POST['numDias'];
    $concesion = $_POST['concesion'];
    $insertar = true;
}

/* Crecamos la conexion y lanzamos la consulta previamente diseñada */
$conexion = new conexionBBDD();

$statement = $conexion->getNumDiasMod($idDepartamento, $idLicencia, $fecha, $numDiasMod, $concesion);
$datos = $statement->fetchAll();

if ($datos != null)
    echo json_encode($datos);

/* Al terminar cerramos la conexion */
$conexion->desconectar();
