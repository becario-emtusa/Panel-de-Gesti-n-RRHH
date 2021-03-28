<!DOCTYPE html>
<html lang="es">
<?php
include './fragmentos/cabecera.php';
?>

<body>
    <?php
    include './fragmentos/menu.php';
    ?>
    <!-- Header -->
    <header class="content-header">
        <div class="container-fluid">
            <h1>RESUMEN</h1>
        </div>
    </header>

    <main>
        <div class="tabla">
            <?php
            /* Necesario incluir el fichero de conexion a la BBDD */
            require_once("./fragmentos/conexionBBDD.php");

            /* Creamos la conexion y lanzamos la consulta previamente diseñada */
            $conexion = new conexionBBDD();
            $statement = $conexion->getTablaResumen();

            /* Generamos un option por cada valor que nos devuelva la consulta */
            $contador = 0;
            while ($row = $statement->fetch() and $contador < 10) {
                echo '<a>' . $row->NSolicitud . " - " . $row->Fecha . '</a>';
                echo '<br>';
                $contador++;
            }

            /* Al terminar cerramos la conexion */
            $conexion->desconectar();
            ?>
        </div>
    </main>

    <?php
    include './fragmentos/footer.php';
    ?>

    <script src="../../dist/js/funcionesEmtusa.js"></script>
    <script src="../../dist/js/menu.js"></script>
</body>


</html>