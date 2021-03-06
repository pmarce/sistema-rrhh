(function($) {
    $( ".button-opciones" ).on( "click", function() {
        console.log('boton precionado');
        var id_boleta = $(this).attr('id-boleta');
        var id_tipo_boleta = $(this).attr('id-tipo-boleta');
        var id_empleado = $(this).attr('id-empleado');
        var id_horario = $(this).attr('id-horario');
        var nombre = $(this).attr('nombre');
        var boleta = $(this).attr('boleta');
        var fecha = $(this).attr('fecha');
        var fecha_ini = $(this).attr('fecha-ini');
        var fecha_fin = $(this).attr('fecha-fin');
        var dias = $(this).attr('dias');
        var fecha_marcado = $(this).attr('fecha-marcado');
        var periodo_marcado = $(this).attr('periodo-marcado');
        if(id_tipo_boleta == 14){
            $('#boleta-normal').hide();
            $('#boleta-olvido').show();
        }else{
            $('#boleta-normal').show();
            $('#boleta-olvido').hide();
        }

        if(periodo_marcado == '1e'){
            var texto_periodo = 'Entrada 1º periodo';
        }else if(periodo_marcado == '1s'){
            var texto_periodo = 'Salida 1º periodo';
        }else if(periodo_marcado == '2e'){
            var texto_periodo = 'Entrada 2º periodo';
        }else{
            var texto_periodo = 'Salida 2º periodo';
        }

        $('#modal-empleado-nombre').val(nombre);
        $('#modal-empleado-fecha').val(fecha);
        $('#modal-empleado-boleta').val(boleta);
        $('#modal-empleado-dias').val(dias);
        $('#input-id-boleta').val(id_boleta);
        $('#input-id-tipo-boleta').val(id_tipo_boleta);
        $('#input-id-empleado').val(id_empleado);
        $('#input-id-horario').val(id_horario);
        $('#input-fecha-inicio').val(fecha_ini);
        $('#input-fecha-fin').val(fecha_fin);
        $('#input-texto-boleta').val(boleta);
        $('#modal-input-periodo-marcado').val(texto_periodo);
        $('#input-fecha-marcado').val(
            $.format.date(fecha_marcado,'yyyy-MM-dd')
        );
        $('#input-periodo-marcado').val(periodo_marcado);
    });

    $( "#button-boleta" ).on( "click", function() {
        $("#form-aprobar-boleta").submit();
    });
    $('#table-administracion-boletas').DataTable({
        "order": [
            [3, "desc"]
        ],
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:", 
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
})(jQuery);