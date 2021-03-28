const date = document.querySelector('#fecha-input');
date.value = moment().format('YYYY-MM-DD');

const day = document.querySelector('#dia-input');
day.value = 0;

function mostrar_aviso() {
    const checkbox = document.querySelector('#concesion-inmd-value');
    const aviso = document.querySelector('.aviso-concesion');

    if (checkbox.checked) {
        aviso.style = `opacity: 1; height: auto; padding: 0rem 0rem 1rem 0rem;`;
    } else {
        aviso.style = `opacity: 0; height: 0; padding: 0;`;
    }
}

function get_num_dias() {
    const visor = document.querySelector('#dia-input');
    const mensaje = document.querySelector('#mensaje-span');

    var idDepartamento = document.querySelector('#selectDepartamentos').value;
    var idLicencia = document.querySelector('#selectLicencias').value;
    var fecha = document.querySelector('#fecha-input').value;

    fecha = fecha.replace('-', '').replace('-', '');

    var dataString = 'idDepartamento=' + idDepartamento + "&idLicencia=" + idLicencia + "&fecha=" + fecha;

    $.ajax({
        type: "POST",
        data: dataString,
        url: '/fragmentos/getDiasMod.php',
        success: function (data) {
            try {
                var json_obj = JSON.parse(data);
                var valores = json_obj[0];

                if (idDepartamento === valores["IdDepartamento"]) {
                    visor.value = valores["Dias"];
                } else {
                    visor.value = 0;
                }

                if (valores["AumentoDias"] === '0') {
                    $('#dia-input').attr({
                        "max": visor.value
                    })
                }

                if (valores["DisminucionDias"] === '0') {
                    $('#dia-input').attr({
                        "min": visor.value
                    })
                }

                //mensaje.innerHTML = `<strong id="texto-mensaje">Mostrando ${valores["IdDepartamento"]}</strong>`;
            } catch {
                console.log("ERROR");
            }
        },
        error: function () {
            alert("Ha ocurrido un error la realizar la petición, vuelva a intentarlo más tarde.");
        }
    })
}

function modificar_dia() {
    const visor = document.querySelector('#dia-input');
    const mensaje = document.querySelector('#mensaje-span');
    var concesion = document.querySelector('#concesion-inmd-value').checked;

    if (concesion) {
        concesion = 1;
    } else {
        concesion = 0;
    }

    var idDepartamento = document.querySelector('#selectDepartamentos').value;
    var idLicencia = document.querySelector('#selectLicencias').value;
    var fecha = document.querySelector('#fecha-input').value;

    fecha = fecha.replace('-', '').replace('-', '');

    var num_dias_modificado = visor.value;
    var dataString = 'idDepartamento=' + idDepartamento + "&idLicencia=" + idLicencia + "&fecha=" + fecha + "&numDias=" + num_dias_modificado + "&concesion=" + concesion;

    console.log(dataString);

    $.ajax({
        type: "POST",
        data: dataString,
        url: '/fragmentos/getDiasMod.php',
        success: function (data) {
            try {
                var json_obj = JSON.parse(data);
                var valores = json_obj[0];

                if (idDepartamento === valores["IdDepartamento"]) {
                    visor.value = valores["Dias"];
                } else {
                    visor.value = 0;
                }

                if (valores["AumentoDias"] === '0') {
                    $('#dia-input').attr({
                        "max": visor.value
                    })
                }

                if (valores["DisminucionDias"] === '0') {
                    $('#dia-input').attr({
                        "min": visor.value
                    })
                }

                mensaje.innerHTML = `<strong id="texto-mensaje">Modificación realizada con éxito.</strong>`;
            } catch {
                mensaje.innerHTML = `<strong id="texto-mensaje">Se ha producido un fallo durante la modificación.</strong>`;
                console.log("ERROR");
            }
            get_num_dias();
        },
        error: function () {
            alert("Ha ocurrido un error la realizar la petición, vuelva a intentarlo más tarde.");
        }
    })

}