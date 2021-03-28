<!DOCTYPE html>
<html lang="es">
<link rel="stylesheet" href="/dist/css/login.css">

<?php
include './fragmentos/cabecera.php';
?>

<body>
    <?php
    include './fragmentos/menu.php';
    ?>

    <!-- Header -->
    <header>
        <h1>Introduzca los datos de usuario</h1>
    </header>

    <!-- Contenido -->
    <main>
        <form method="post" action="" name="login-form">
            <div class="usuario">
                <a id="box"><i class="fas fa-user"></i></a><label>Usuario:</label>
                <input type="text" name="username" pattern="[a-zA-Z0-9]+" required />
            </div>
            <div class="password">
                <a id="box"><i class="fas fa-unlock-alt"></i></a><label>Contraseña:</label>
                <input type="password" name="password" required />
            </div>
            <button type="submit" name="login" value="login">Iniciar</button>
        </form>
    </main>

    <!-- Footer -->
    <?php
    include './fragmentos/footer.php';
    ?>

    <script src="../../dist/js/funcionesEmtusa.js"></script>
    <script src="../../dist/js/menu.js"></script>
</body>

</html>