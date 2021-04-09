<!DOCTYPE html>
<html lang="es">
<?php
include './fragmentos/cabecera.php';
?>

<head>
    <link rel="stylesheet" href="/dist/css/consulta-solicitudes.css">
    <title>Consulta de solicitudes - EMTUSA Huelva</title>
</head>

<body>
    <?php
    include './fragmentos/menu.php';
    ?>
    <header class="content-header">
        <div class="container-fluid">
            <h2>CONSULTA DE SOLICITUDES</h2>
        </div>
    </header>

    <main>
        <div class="tarjeta">
            <div class="col-xs-4 col-sm-12">
                <div class="cuerpo">
                    <div class="contenido">
                        <label>NIF</label>
                        <input type="text" class="form-control" id="input-NIF" placeholder="Introduzca su NIF..." onchange="generar_tabla()">
                    </div>
                </div>
            </div>
        </div>

        <div class="contenido-tabla">
            <div class="leyenda">
                <div class="title-leyenda">
                    <span>Leyenda</span>
                </div>
                <ul>
                    <li id="pendiente"><i class="far fa-question-circle"></i>Pendiente</li>
                    <li id="aceptada"><i class="far fa-check-circle"></i>Aceptada</li>
                    <li id="denegada"><i class="far fa-times-circle"></i>Denegada</li>
                </ul>
            </div>


            <div class="solicitudes">

            </div>

            <div class="aviso-solicitud">
                <p>Puede revisar su solicitud desde las 00:00 Horas<br>del día siguiente de la petición.</p>
            </div>
        </div>

        <div class="aviso_popup">
            <div class="modal-content">
                <p><strong id="textoModal"></strong></p>
                <div class="opciones">
                    <button class="continuar" onclick="anular_solicitud()">Confirmar</button>
                    <button class="cancelar" onclick="cerrar_aviso_anulacion()">Cancelar</button>
                </div>
            </div>
        </div>

    </main>

    <?php
    include './fragmentos/footer.php';
    ?>

    <script src="../../dist/js/consulta-solicitudes.js"></script>
    <script src="../../dist/js/menu.js"></script>
</body>

</html>