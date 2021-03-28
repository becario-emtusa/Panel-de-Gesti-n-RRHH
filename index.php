<!DOCTYPE html>
<html lang="es">
<?php
include './fragmentos/cabecera.php';
?>

<head>
    <title>Inicio - EMTUSA Huelva</title>
</head>

<body>
    <?php
    include './fragmentos/menu.php';
    ?>

    <!-- Header -->
    <header class="content-header">
        <div class="container-fluid">
            <h1 id="titulo">Bienvenido al portal de</br>Solicitud de Licencias de EMTUSA</h1>
        </div>
    </header>

    <!-- Contenido -->
    <main class="content d-flex justify-content-center">

        <img id="imgPortada" src="images/portada.jpg"></img>
    </main>

    <!-- Footer -->
    <?php
    include './fragmentos/footer.php';
    ?>

    <script src="../../dist/js/funcionesEmtusa.js"></script>
    <script src="../../dist/js/menu.js"></script>
</body>

</html>