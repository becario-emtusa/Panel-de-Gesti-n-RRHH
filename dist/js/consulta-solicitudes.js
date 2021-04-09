/*
* consulta-solicitudes
* ------------------
* Aquí se listarán las distintas funciones de JavaScript
* que necesitaremos para el fichero:
* consulta-solicitudes.php
*/

function representar_tabla(data) {
    var div = document.querySelector('.solicitudes');
    var leyenda = document.querySelector('.leyenda');
    var aviso_solicitud = document.querySelector('.aviso-solicitud');

    div.innerHTML = '';

    div.style.height = '100%';
    div.style.opacity = '100%';
    div.style.overflow = 'hidden';

    leyenda.style.height = '100px';
    leyenda.style.opacity = '100%';
    leyenda.style.overflow = 'initial';

    aviso_solicitud.style.height = 'initial';
    aviso_solicitud.style.opacity = '100%';
    aviso_solicitud.style.overflow = 'initial';

    if (div.childNodes.length <= 1) {
        var tabla = document.createElement('table');
        tabla.className = "tabla";

        var thead = document.createElement('thead');
        var tr = document.createElement('tr');

        // CREACIÓN COLUMNAS TABLA //
        var th_num_solicitud = document.createElement('th');
        var th_tipo_solicitud = document.createElement('th');
        var th_fecha_solicitud = document.createElement('th');
        var th_fecha_solicitada = document.createElement('th');
        var th_respuesta = document.createElement('th');
        var th_anular = document.createElement('th');

        th_tipo_solicitud.id = "pc";
        th_fecha_solicitud.id = "pc";

        th_num_solicitud.appendChild(document.createTextNode('Solicitud'));
        th_tipo_solicitud.appendChild(document.createTextNode('Tipo'));
        th_fecha_solicitud.appendChild(document.createTextNode('Fecha de la Solicitud'));
        th_fecha_solicitada.appendChild(document.createTextNode('Fecha Solicitada'));
        th_respuesta.appendChild(document.createTextNode('Estado'));
        th_anular.appendChild(document.createTextNode('Anular'));

        tr.appendChild(th_num_solicitud);
        tr.appendChild(th_tipo_solicitud);
        tr.appendChild(th_fecha_solicitada);
        //tr.appendChild(th_fecha_solicitud);
        tr.appendChild(th_respuesta);
        tr.appendChild(th_anular);
        thead.appendChild(tr);

        // CREACIÓN FILAS TABLA //
        var tbody = document.createElement('tbody');
        tbody.id = "cuerpoTabla";

        for (var index = 0; index < data.length; index++) {
            var fila = data[index];
            var tr = document.createElement('tr');
            var th = document.createElement('th');

            th.appendChild(document.createTextNode(fila.Solicitud));

            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');
            var td5 = document.createElement('td');

            td5.innerHTML = `<input value='${fila.Solicitud}' type="checkbox" onchange="mostrar_aviso_anulacion()">`;

            td1.id = 'pc';
            td2.id = 'pc';
            td1.appendChild(document.createTextNode(fila.Tipo));
            fecha = new Date(fila.Fecha);

            td3.appendChild(document.createTextNode(moment(fecha).format('DD/MM/YYYY')));
            td2.appendChild(document.createTextNode(fila.Solicitado));

            switch (fila.Estado) {
                case null:
                    var icon = document.createElement("i");
                    icon.classList = 'far fa-question-circle';
                    td4.appendChild(icon);
                    break;
                case "Concedida":
                    var icon = document.createElement("i");
                    icon.classList = 'far fa-check-circle';
                    td4.appendChild(icon);
                    break;
                case "Denegada":
                    var icon = document.createElement("i");
                    icon.classList = 'far fa-times-circle';
                    td4.appendChild(icon);
                    break;
                default:
                    break;
            }

            tr.appendChild(th);
            tr.appendChild(td1);
            tr.appendChild(td3);
            //tr.appendChild(td2);
            tr.appendChild(td4);
            if (fila.BtnAnulacion === '1') {
                tr.appendChild(td5);
            }

            tbody.appendChild(tr);
        }

        tabla.appendChild(thead);
        tabla.appendChild(tbody);
        div.appendChild(tabla);
    } else {
        div.style.height = '0';
        div.style.opacity = '0';
        div.style.overflow = 'hidden';
        div.innerHTML = "";
    }

}

/* Almacenamos el NIF */
const NIF = document.querySelector('#input-NIF');

/* Almacenamos el contenido del div opciones {Botones CONFIRMAR, CANCELAR}
   Necesario, ya que lo modificamos cuando aparezca el mensaje.
*/
const contenido_botones = document.querySelector('.opciones').innerHTML;

function generar_tabla() {
    var NIF_value = NIF.value;
    var data_string = 'nif=' + NIF_value;

    if (NIF_value !== "") {
        $.ajax({
            type: "POST",
            data: data_string,
            url: './fragmentos/getSolicitudes.php',
            success: function (data) {
                if (data.length > 0) {
                    /* Llamamos a la función que representa la tabla */
                    representar_tabla(JSON.parse(data));
                } else {
                    var div = document.querySelector('.solicitudes');
                    div.innerHTML = `<strong>No existen solicitudes.</strong>`;
                }
            },
            error: function () {
                alert("ERROR");
            }
        })
    }
}

/* Almacenamos el popup */
const aviso = document.querySelector('.aviso_popup');
var num_solicitud_anulacion;

function mostrar_aviso_anulacion() {
    const fila_anular = document.querySelectorAll('input[type="checkbox"]')

    for (let input of fila_anular) {
        if (input.checked) {
            /* Texto a mostrar */
            document.getElementById('textoModal').innerHTML = `<span id="texto-mensaje">Atención:</span><br> Se va a proceder a anular la solicitud ${input.value}.<br><br>Si cancela la petición, no podrá volver a solicitar el día posteriormente.`;

            /* Ponemos visible el popup */
            aviso.style.display = "block";

            /* Si el usuario pulsa fuera del cartel, lo cierra */
            window.onclick = function (event) {
                if (event.target == aviso) {
                    aviso.style.display = "none";
                    input.checked = false; // Desmarco la casilla
                }
            }

            num_solicitud_anulacion = input.value;

            break;
        }
    }
}

function cerrar_aviso_anulacion() {
    aviso.style.display = 'none';

    const fila_anular = document.querySelectorAll('input[type="checkbox"]')
    for (let input of fila_anular) {
        if (input.checked) {
            /* Desmarcamos el checkbox */
            input.checked = false;

            break;
        }
    }

    /* Restauramos el contenido original del div opciones */
    document.querySelector('.opciones').innerHTML = contenido_botones;
}

function anular_solicitud() {
    var data_string = 'num_solicitud=' + num_solicitud_anulacion;

    $.ajax({
        type: "POST",
        data: data_string,
        url: './fragmentos/setAnulacion.php',
        success: function (data) {
            var json_obj = JSON.parse(data);
            json_obj = json_obj[0];

            document.getElementById('textoModal').innerHTML = `<strong>${json_obj["Mensaje"].replace('.', '.<br>')}.</strong>`;

            const botones = document.querySelector('.opciones');
            botones.innerHTML = `<button class="continuar" onclick="cerrar_aviso_anulacion();">Cerrar</button>`;

            if (json_obj["Id"] !== '-1') {
                generar_tabla();
            }
        },
        error: function () {
            alert("ERROR");
        }
    })
}