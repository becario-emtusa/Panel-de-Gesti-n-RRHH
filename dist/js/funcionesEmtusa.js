/*
 * funcionesEmtusa
 * ------------------
 * Aquí se listarán las distintas funciones de JavaScript
 * que se necesitarán para el correcto funcionamiento.
 */

var Calendario = [];

function getColorporFecha($pFecha) {
    try {
        for (let elemento of Calendario) {
            var fechaCal = moment(elemento[0], $('#inputFecha2').data('daterangepicker').format);

            if (fechaCal.isSame($pFecha)) {
                var valores = new Object();

                valores["Activo"] = elemento[1];
                valores["Color"] = elemento[2];

                return {
                    "Activo": elemento[1],
                    "Color": elemento[2]
                };
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function mostrarTextoUnidadTiempo() {
    switch (document.getElementById('selectMotivoPeticion').value) {
        case '1':
            // Mostrar tarjeta //
            //document.getElementById('Contenedor_Duracion').style.visibility = 'initial';
            //document.getElementById('Contenedor_Duracion').style.display = 'inherit';
            document.getElementById('Contenedor_Duracion').classList.add('tarjetaVisible');

            // Mostramos la tabla con los días restantes //
            document.getElementById('divMostrarTablaDiasPendientes').style.visibility = 'initial';
            document.getElementById('divMostrarTablaDiasPendientes').style.display = 'inherit';
            document.getElementById('Contenedor_Motivo').style.minHeight = '250px';
            document.getElementById('Contenedor_Motivo').style.maxHeight = 'initial';

            document.getElementById('Contenedor_Duracion').style.maxHeight = 'initial';
            document.getElementById('Contenedor_Duracion').style.minHeight = '160px';

            // Numerico //
            document.getElementById('divNumerico').style.visibility = 'hidden';
            document.getElementById('divNumerico').style.display = 'none';
            document.getElementById('inputInicio').style.visibility = 'hidden';

            // Calendario //
            document.getElementById('divCalendario').style.visibility = 'visible';
            document.getElementById('divCalendario').style.display = 'flex';
            document.getElementById('divCalendario').style.flexDirection = 'column';
            document.getElementById('inputFecha').style.visibility = 'visible';

            document.getElementById('buttonFin').classList.remove('botonOculto');
            break;
        case '0':
            // Ocultamos la tarjeta //
            //document.getElementById('Contenedor_Duracion').style.visibility = 'hidden';
            //document.getElementById('Contenedor_Duracion').style.display = 'none';
            document.getElementById('Contenedor_Duracion').classList.remove('tarjetaVisible');
            document.getElementById('Contenedor_Duracion').classList.add('tarjetaOculto');

            // Ocultamos la tabla con los días restantes //
            document.getElementById('divMostrarTablaDiasPendientes').style.visibility = 'hidden';
            document.getElementById('divMostrarTablaDiasPendientes').style.display = 'none';

            document.getElementById('divNumerico').style.visibility = 'hidden';
            document.getElementById('inputInicio').style.visibility = 'hidden';
            document.getElementById('divCalendario').style.visibility = 'hidden';
            document.getElementById('divCalendario').style.display = 'none';
            document.getElementById('inputFecha').style.visibility = 'hidden';
            document.getElementById('Contenedor_Duracion').style.minHeight = '160px';
            document.getElementById('Contenedor_Duracion').style.maxHeight = '160px';
            break;
    }
}

function mostrarTextoMotivoPeticion() {
    switch (document.getElementById('selectMotivoPeticion').value) {
        case "1":
            document.getElementById('divMotivoLicencia').style.visibility = 'none';
            document.getElementById('inputMotivoLicencia').style.visibility = 'hidden';
            document.getElementById('Contenedor_Motivo').style.minHeight = '160px';
            break;
        case "2":
        case "5":
            document.getElementById('inputMotivoLicencia').style.display = 'initial';
            document.getElementById('inputMotivoLicencia').style.visibility = 'visible';
            document.getElementById('Contenedor_Motivo').style.minHeight = '210px';
            break;
        default:
            document.getElementById('divMotivoLicencia').style.visibility = 'none';
            document.getElementById('inputMotivoLicencia').style.visibility = 'hidden';
            document.getElementById('Contenedor_Motivo').style.minHeight = '160px';
            break;
    }
}

function consultaDNI() {
    var dni = document.getElementById('inputDNI').value;
    var dataString = 'dni=' + dni;

    if (dni != "") {
        $.ajax(
            {
                type: "POST",
                data: dataString,
                url: '/fragmentos/getDatos.php',
                success: function (data) {
                    var json_obj = JSON.parse(data);

                    document.getElementById("inputNombre").value = json_obj["Nombre"] + ' ' + json_obj["Apellidos"];
                    document.getElementById("inputDepartamento").value = json_obj["Departamento"].toLowerCase();
                    document.getElementById("inputCategoria").value = json_obj["Categoria"].toLowerCase();

                    document.getElementById('Contenedor_Motivo').classList.remove('tarjetaOculto');
                    document.getElementById('divDNI').classList.remove('oculto');
                    document.getElementById('divDepartCat').classList.remove('oculto');

                },
                error: function () {
                    alert("¡Ha habido un fallo!");
                }
            }
        );
    } else {
        document.getElementById("inputNombre").value = "";
        document.getElementById("inputDepartamento").value = "";
        document.getElementById("inputCategoria").value = "";
    }
}

function consultaDias() {
    var dni = document.getElementById('inputDNI').value;
    var tipoLicencia = document.getElementById('selectMotivoPeticion').value;
    var dataString = 'dni=' + dni + "&tipoLicencia=" + tipoLicencia;
    actualizarCalendario();

    if (dni != "") {
        hayDatos = true;
        $.ajax(
            {
                type: "POST",
                data: dataString,
                url: '/fragmentos/getDias.php',
                success: function (data) {
                    var json_obj = JSON.parse(data);
                    var div = document.getElementById("divMostrarTablaDiasPendientes");

                    if (div.childNodes.length <= 1) {
                        var tabla = document.createElement('table');
                        tabla.className = "table table-striped";

                        var thead = document.createElement('thead');
                        var tr = document.createElement('tr');

                        // CREACIÓN COLUMNAS TABLA //
                        var thAnio = document.createElement('th');
                        var thTotal = document.createElement('th');

                        thAnio.scope = "col";
                        thTotal.scope = "col";

                        thAnio.appendChild(document.createTextNode('Año'));
                        thTotal.appendChild(document.createTextNode('Días Disponibles'));

                        tr.appendChild(thAnio);
                        tr.appendChild(thTotal);
                        thead.appendChild(tr);

                        // CREACIÓN FILAS TABLA //
                        var tbody = document.createElement('tbody');
                        tbody.id = "cuerpoTabla";

                        for (var index = 0; index < json_obj.length; index++) {
                            var fila = json_obj[index];
                            var tr = document.createElement('tr');

                            var th = document.createElement('th');
                            th.scope = "row";

                            th.appendChild(document.createTextNode(fila.Año));

                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode(fila.Total));

                            tr.appendChild(th);
                            tr.appendChild(td);

                            tbody.appendChild(tr);
                        }

                        tabla.appendChild(thead);
                        tabla.appendChild(tbody);
                        div.appendChild(tabla);
                    } else {
                        var div = document.getElementById("divMostrarTablaDiasPendientes");
                        div.innerHTML = "";
                    }
                },
                error: function () {
                    alert("¡Ha habido un fallo!");
                }
            }
        );
    } else {
        var div = document.getElementById("divMostrarTablaDiasPendientes");
        div.innerHTML = "";
    }
}

function actualizarCalendario() {
    var dni = document.getElementById('inputDNI').value;
    var tipoLicencia = document.getElementById('selectMotivoPeticion').value;
    var dataString = 'dni=' + dni + "&tipoLicencia=" + tipoLicencia;

    if (dni != "") {
        $.ajax(
            {
                type: "POST",
                data: dataString,
                url: '/fragmentos/getCalendario.php',
                success: function (data) {
                    var json_obj = JSON.parse(data);

                    /* Vaciamos el calendario actual para volver a iniciarlo. */
                    Calendario = [];

                    for (index = 0; index < json_obj.length; index++) {
                        Calendario.push([json_obj[index]["Fecha"], json_obj[index]["Activo"], json_obj[index]["Color"]]);
                    }

                },
                error: function () {
                    alert("Ha ocurrido un error al cargar el calendario.");
                    return null;
                }
            }
        );
    } else {
        return null;
    }
}

function actualizarCalendarioAdmin() {
    var dni = document.getElementById('inputDNI').value;
    var tipoLicencia = document.getElementById('selectMotivoPeticion').value;
    var dataString = 'dni=' + dni + "&tipoLicencia=" + tipoLicencia + "&admin=1";

    if (dni != "") {
        $.ajax(
            {
                type: "POST",
                data: dataString,
                url: '/fragmentos/getCalendario.php',
                success: function (data) {
                    var json_obj = JSON.parse(data);

                    /* Vaciamos el calendario actual para volver a iniciarlo. */
                    Calendario = [];

                    for (index = 0; index < json_obj.length; index++) {
                        Calendario.push([json_obj[index]["Fecha"], json_obj[index]["Activo"], json_obj[index]["Color"]]);
                    }

                },
                error: function () {
                    alert("Ha ocurrido un error al cargar el calendario.");
                    return null;
                }
            }
        );
    } else {
        return null;
    }
}


function recogerDatosFormularioAdmin() {
    /* Recogemos el DNI */
    var dni = document.getElementById('inputDNI').value;

    /* Recogemos la Fecha de Inicio y la Fecha de Fin */
    var fechaIni = new Date($('#inputFecha2').data('daterangepicker').startDate);
    var fechaFin = new Date($('#inputFecha2').data('daterangepicker').endDate);

    /* Ajuste de hora */
    fechaIni.setHours(fechaIni.getHours() + 1);

    /* Ajuste de Fechas si es horario de verano */
    if (moment(fechaIni).isDST()) {
        fechaIni.setHours(fechaIni.getHours() + 1);
    }

    if (moment(fechaFin).isDST()) {
        fechaFin.setHours(fechaFin.getHours() + 1);
    }

    /*
    fechaIni = fechaIni.format('YYYYMMDD');
    fechaFin = fechaFin.format('YYYYMMDD');
    */

    /* Conversion a SQL Server Date */
    fechaIni = fechaIni.toISOString().slice(0, 19);
    fechaFin = fechaFin.toISOString().slice(0, 19);

    /* Recogemos el tipo de Licenia */
    var tipoLicencia = document.getElementById('selectMotivoPeticion').value;

    /* Preparamos los datos */
    var dataString = 'dni=' + dni + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin + "&tipoLicencia=" + tipoLicencia;

    console.log("Fecha Inicial -> " + fechaIni);
    console.log("Fecha Final -> " + fechaFin);

    if (dni != "") {
        $.ajax(
            {
                type: "POST",
                data: dataString,
                url: '/fragmentos/insertarPeticionAdmin.php',
                success: function (data) {
                    /* Recogemos las variables que usaremos para mostrar por pantalla */

                    try {

                        var json_obj = JSON.parse(data);
                        var valor = json_obj[0]["id"];
                        var mensaje = json_obj[0]["mensaje"];

                    } catch (e) {
                        alert(data);
                        console.log("Ha ocurrido un error: " + e);
                    }

                    // Get the modal
                    var modal = document.getElementById("myModal");
                    // Get the button that opens the modal
                    var btn = document.getElementById("buttonFin");
                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];

                    document.getElementById('textoModal').innerHTML = mensaje + ".";

                    // When the user clicks on the button, open the modal
                    modal.style.display = "block";

                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function () {
                        modal.style.display = "none";
                    }

                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }

                    /* Actualizamos el calendario después de hacer la nueva inserción. */
                    actualizarCalendario();
                },
                error: function () {
                    alert("Ha ocurrido un error la realizar la petición, vuelva a intentarlo más tarde.");
                }
            }
        )
    }
}

function recogerDatosFormulario() {
    /* Recogemos el DNI */
    var dni = document.getElementById('inputDNI').value;

    /* Recogemos la Fecha de Inicio y la Fecha de Fin */
    var fechaIni = new Date($('#inputFecha2').data('daterangepicker').startDate);
    var fechaFin = new Date($('#inputFecha2').data('daterangepicker').endDate);

    /* Ajuste de hora */
    fechaIni.setHours(fechaIni.getHours() + 1);

    /* Ajuste de Fechas si es horario de verano */
    if (moment(fechaIni).isDST()) {
        fechaIni.setHours(fechaIni.getHours() + 1);
    }

    if (moment(fechaFin).isDST()) {
        fechaFin.setHours(fechaFin.getHours() + 1);
    }

    /*
    fechaIni = fechaIni.format('YYYYMMDD');
    fechaFin = fechaFin.format('YYYYMMDD');
    */

    /* Conversion a SQL Server Date */
    fechaIni = fechaIni.toISOString().slice(0, 19);
    fechaFin = fechaFin.toISOString().slice(0, 19);

    /* Recogemos el tipo de Licenia */
    var tipoLicencia = document.getElementById('selectMotivoPeticion').value;

    /* Preparamos los datos */
    var dataString = 'dni=' + dni + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin + "&tipoLicencia=" + tipoLicencia;

    console.log("Fecha Inicial -> " + fechaIni);
    console.log("Fecha Final -> " + fechaFin);

    if (dni != "") {
        $.ajax(
            {
                type: "POST",
                data: dataString,
                url: '/fragmentos/insertarPeticion.php',
                success: function (data) {
                    /* Recogemos las variables que usaremos para mostrar por pantalla */

                    try {

                        var json_obj = JSON.parse(data);
                        var valor = json_obj[0]["id"];
                        var mensaje = json_obj[0]["mensaje"];

                    } catch (e) {
                        alert(data);
                        console.log("Ha ocurrido un error: " + e);
                    }

                    // Get the modal
                    var modal = document.getElementById("myModal");
                    // Get the button that opens the modal
                    var btn = document.getElementById("buttonFin");
                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];

                    document.getElementById('textoModal').innerHTML = mensaje + ".";

                    // When the user clicks on the button, open the modal
                    modal.style.display = "block";

                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function () {
                        modal.style.display = "none";
                    }

                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }

                    /* Actualizamos el calendario después de hacer la nueva inserción. */
                    actualizarCalendario();
                },
                error: function () {
                    alert("Ha ocurrido un error la realizar la petición, vuelva a intentarlo más tarde.");
                }
            }
        )
    }
}
