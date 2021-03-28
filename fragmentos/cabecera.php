<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />

  <link rel="icon" href="/images/icon.ico" class="image/x-icon">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.css">

  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- CSS Styles -->
  <link rel="stylesheet" href="/dist/css/adminlte.css">
  <link rel="stylesheet" href="/dist/css/estiloEmtusa.css">

  <!-- jQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <!-- Bootstrap 5 -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>

  <!-- DatePicker -->
  <script src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

  <!-- Bootstrap 4 -->
  <script src="/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- daterangepicker -->
  <script src="/plugins/moment/moment.min.js"></script>
  <script src="/plugins/daterangepicker/daterangepicker.js"></script>

  <script>
    $(function() {
      $('#inputFecha').daterangepicker({
        "singleDatePicker": true,
        "minYear": 2021,
        "maxYear": 2021,
        "showISOWeekNumbers": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "startDate": moment(),
        "opens": "center",
        "drops": "up",
      }, function(start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
      });
    });

    $(function() {
      $('#inputFecha2').daterangepicker({
        "locale": {
          "format": "DD/MM/YYYY",
          "separator": " - ",
          "applyLabel": "Guardar",
          "cancelLabel": "Cancelar",
          "fromLabel": "From",
          "toLabel": "To",
          "customRangeLabel": "Custom",
          "weekLabel": "Sem",
          "firstDay": 1,
          "daysOfWeek": [
            "Do",
            "Lu",
            "Ma",
            "Mi",
            "Ju",
            "Vi",
            "Sa"
          ],
          "monthNames": [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
          ]
        },
        "minYear": 2021,
        "maxYear": 2050,
        "showISOWeekNumbers": true,
        "autoApply": true,
        "linkedCalendars": true,
        "showCustomRangeLabel": false,
        "minDate": null,
        "maxDate": moment().add(33, 'days'),
        "opens": "center",
        "drops": "up",
        "isInvalidDate": function(date) {
          var valores = getColorporFecha(date);

          if (valores != undefined) {
            switch (valores["Activo"] + "|" + valores["Color"]) {
              case "0|null":
                return true;
                break;
              default:
                return false;
                break;
            }
          } else {
            return true;
          }
        },
        "isCustomDate": function(date) {
          var valores = getColorporFecha(date);

          if (valores != undefined) {
            switch (valores["Activo"] + "|" + valores["Color"]) {
              case "0|R":
                return "disabled off";
                break;
              case "1|V":
                return "diaLibre";
                break;
              case "1|R":
                return "diaOcupado";
                break;
              case '0|Z':
                return "diaPedido";
                break;
              default:
                return "";
                break;
            }
          }
        }
      }, function(start, end, label) {

        date1 = new Date(start);
        date2 = new Date(end);

        date1.setHours(date1.getHours() + 1);

        if (moment(date1).isDST()) {
          date1.setHours(date1.getHours() + 1);
          date2.setHours(date2.getHours() + 1);
        }

        console.log(date1.toISOString(), date2.toISOString());
        //console.log(moment(date1).format('YYYYMMDD'), moment(date2).format('YYYYMMDD'));
        //console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
      }).on('apply.daterangepicker', function(ev, picker) {
        var start = moment(picker.startDate.format('YYYY-MM-DD'));
        var end = moment(picker.endDate.format('YYYY-MM-DD'));
        var diff = end.diff(start, 'days'); // returns correct number
        document.getElementById('contadorDias').value = diff + 1;
      }).on('showCalendar.daterangepicker', function(ev, picker) {
        /* IMPLEMENTACIÓN DE LEYENDA DE LOS DÍAS */
      });
    });
  </script>
</head>