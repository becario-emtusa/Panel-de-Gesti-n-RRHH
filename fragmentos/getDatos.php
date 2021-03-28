<?php
    /* Necesario incluir el fichero de conexion a la BBDD */
    require_once("./conexionBBDD.php");
    session_start();

    /* Obtenemos el campo que hemos pasado desde JQuery */
    $dni = $_POST['dni'];

    /* Crecamos la conexion y lanzamos la consulta previamente diseñada */
    $conexion = new conexionBBDD();

    /* Obtenemos los datos personales del usuario {
        Nombre,
        Apellidos,
        Departamento,
        Categoria
    } */
    $statement = $conexion->getDatosPersonal($dni);
    $datosPersona = $statement->fetch();

    /* Creamos el array que vamos a devolver */
    $datos['Nombre'] = $datosPersona->Nombre;
    $datos['Apellidos'] = $datosPersona->Apellidos;
    $datos['Departamento'] = $datosPersona->Departamento;
    $datos['Categoria'] = $datosPersona->Categoria;
    
    //$datos['DiasPeticiones'] = $datosPeticion->Numero;

    /* Si el resultado contiene un resultado, lo devolvemos */
    if( $datosPersona != null ) {
        echo json_encode( $datos );
    }

    /* Al terminar cerramos la conexion */
    $conexion->desconectar();
?>