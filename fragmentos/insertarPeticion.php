<?php
    /* Necesario incluir el fichero de conexion a la BBDD */
    require_once("./conexionBBDD.php");
    session_start();

    /* Obtenemos el campo que hemos pasado desde JQuery */
    $dni = $_POST['dni'];
    $tipoLicencia = $_POST['tipoLicencia'];
    $fechaIni = $_POST['fechaIni'];
    $fechaFin = $_POST['fechaFin'];

    /* Crecamos la conexion y lanzamos la consulta previamente diseñada */
    $conexion = new conexionBBDD();

    $statement = $conexion->insertarPeticion($dni, $tipoLicencia, $fechaIni, $fechaFin);
    
    /* Explicación:
    The PDO engine sees this query as returning two result sets
    (the older mssql engine probably just ignored all but the last query in an overall query string).
    I have managed to make it work by skipping over the first result set (the temporary table) using the following command

    $statement->nextRowset();
    And then using $statement->fetch(); as normal

    Traducción:
    El motor de PDO observa que la query devuelve 2 conjutnos de resultados.
    La solución es saltar el primer resultado y después hacer fetch para recoger el resultado.

    Otra solución, en el procedimiento incluir:
    SET NOCOUNT ON
    */
    /* Necesario saltar Rowset */



    // if( $statement->columnCount() !== 0 ) {

    //     /* Si tenemos un número de columna distinto de 0, vamos avanzar hasta llegar a 0 */
    //     while( $statement->columnCount() === 0 && $statement->nextRowSet() ) {
    //         print_r($statement->columnCount());
    //         $statement->nextRowset();
    //         print_r($statement->columnCount());
    //     }

    // } else {
    //     print_r("FueraIF");
    //     print_r($statement->columnCount());
    //     $statement->nextRowset();
    // }

    $resultado = $statement->fetchAll();
    
    /* Devolvemos el resultado */
    echo json_encode( $resultado );

    /* Al terminar cerramos la conexion */
    $conexion->desconectar();
