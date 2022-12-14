

var table;
function listar() {

    table = $("#example3").DataTable({
        "ordering": false,
        "bLengthChange": false,
        "searching": { "regex": false },
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "pageLength": 6,
        "destroy": true,
        "async": false,
        "processing": true,
        ajax: {
            method: "POST",
            url: "Categorias.aspx/listar",
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            data: function (d) {
                return JSON.stringify(d);
            },
            dataSrc: "d.data"
        },
        columns: [

            { "data": "nombre_categoria" },
           
            { "defaultContent": "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>  " }
        ],

        responsive: true,
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        dom: 'Bfrtip',

        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel success"></i> ',
                titleAttr: 'Exportar a Excel',
                class: 'btn btn-success'

            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                class: 'btn btn-danger'
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print success"></i> ',
                titleAttr: 'Imprimir',
                class: 'btn btn-info'
            }, {
                extend: 'csv',
                class: 'btn btn-info'
            }
        ]
        , "language": idioma_espanol

    });
    document.getElementById("example3_filter").style.display = "none";

    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function () {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

}



$('#example3').on('click', '.editar', function () {
    var data = table.row($(this).parents('tr')).data();
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }
    $("#EditarModal").modal({ backdrop: 'static', keyboard: false })
    $("#EditarModal").modal('show');

    $("#id_edith").val(data.id_categoria);
    $("#edith_nombre").val(data.nombre_categoria);
})



function ActulizarDatos() {

    let Nombre = $('#edith_nombre').val();
    let idd = $('#id_edith').val();

    var data = {
        p: {
            id_categoria: idd,
            nombre_categoria: Nombre,
           
        }
    }
    $("#EditarModal").modal('hide');

    $.ajax({
        method: "POST",
        url: "Categorias.aspx/actualizarDatos",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (info) {
        if (info.d == 1) {

            Swal.fire("Mensaje De Confirmacion", "Datos correctamente actualizados  ", "success")
                .then((value) => {

                    table.ajax.reload();
                });
        } else {
            return Swal.fire("Mensaje De Advertencia", "Lo sentimos, No se pudo completar la actualizacion", "warning");
        }

    })


}




function Registrar() {


    let nombre = $('#nombre').val();
    

    var data = {
        p: {
            nombre_categoria: nombre
        }
    }

    $.ajax({
        method: "POST",
        url: "Categorias.aspx/InsertarCategoria",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (info) {
        $("#exampleModal").modal('hide');//ocultamos el modal
        $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
        $('.modal-backdrop').remove();//eliminamos el backdrop del modal

        if (info.d == 1) {

            Swal.fire(
                'Mensaje De Confirmacion',
                'Datos correctamente Registrados ',
                'success'
            )
            table.ajax.reload();
        } else {
            return Swal.fire("Mensaje De Advertencia", "Lo sentimos, No se pudo completar l", "warning");
        }

    })

}
function filterGlobal() {
    $('#example3').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}


