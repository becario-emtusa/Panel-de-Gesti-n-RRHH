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
        IdDepartamento,
        IdCategoria
    } */
    $statement = $conexion->getDatosPersonal($dni);
    $datosPersona = $statement->fetch();

    /* Obtenemos el departamento del usuario */
    $statement = $conexion->getDepartamento($datosPersona->IdDepartamento);
    $departamento = $statement->fetch();

    /* Obtenemos la categoria del usuario */
    $statement = $conexion->getCategoria($datosPersona->IdCategoria);
    $categoria = $statement->fetch();

    /* Obtenemos el número de días que se puede pedir para esa petición */
    /* TEMPORAL, EN UN FUTURO SE HARÁ USO DE UNA VISTA QUE CALCULARÁ ESTO */
    $statement = $conexion->getMotivosPeticion();
    $datosPeticion = $statement->fetch();

    /* Creamos el array que vamos a devolver */
    $datos['Nombre'] = $datosPersona->Nombre;
    $datos['Apellidos'] = $datosPersona->Apellidos;
    $datos['Departamento'] = $departamento->Denominacion;
    $datos['Categoria'] = $categoria->Categoria;
    $datos['DiasPeticiones'] = $datosPeticion->Numero;

    /* Si el resultado contiene un resultado, lo devolvemos */
    if( $datosPersona != null ) {
        echo json_encode( $datos );
    }

    /* Al terminar cerramos la conexion */
    $conexion->desconectar();
?>