

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
            url: "Empleados.aspx/getUsers",
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            data: function (d) {
                return JSON.stringify(d);
            },
            dataSrc: "d.data"
        },
        columns: [

            { "data": "Nombre" },
            { "data": "Apellido" },
            { "data": "Dni" },
            {
                "data": "Estado",
                render: function (data, type, row) {
                    if (data == 'activo') {
                        return "<span class='badge light badge-success'>Activo</span>";
                    } else {
                        return "<span class='badge light badge-danger'>Desactivo</span>";
                    }
                }

            },
            { "defaultContent": "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>   &nbsp;   <button style='font-size:13px;' type='button' class='desactivar btn btn-danger'><i class='fa fa-trash'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success'><i class='fa fa-check'></i></button>" }
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

    $("#id_edith").val(data.id);
    $("#edith_nombre").val(data.Nombre);
    $("#edith_Apellidp").val(data.Apellido);
    $("#edithDNi").val(data.Dni);

})



function ActulizarDatos() {

    let Nombre = $('#edith_nombre').val();
    let apellido = $('#edith_Apellidp').val();
    let dni = $('#edithDNi').val();
    let idd = $('#id_edith').val();

    var data = {
        user: {
            id: idd,
            nombres: Nombre,
            apellidos: apellido,
            dni: dni
        }
    }
    $("#EditarModal").modal('hide');


    $.ajax({
        method: "POST",
        url: "Empleados.aspx/actulizarEmpleado",
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
    let dire = $('#direccion').val();
    let nombre = $('#cliente_nombre').val();
    let distrito = $('#cbm_distrito').val();
    let dnii = $('#dni').val();
    let apellido = $('#Apellido').val();
    let nacimiento = $('#fechanacimiento').val();
    let genero = $('#cb_genero').val();
    let estado = $('#cb_estado').val();

    var data = {
        p: {
            nombreDireccion: dire,
            id_distrito: distrito,
            dni: dnii,
            nombres: nombre,
            apellidos: apellido,
            fecha_nacimiento: nacimiento,
            id_genero: genero,
            id_estado: estado
        }
    }

    $.ajax({
        method: "POST",
        url: "Empleados.aspx/InsertarEmpleado",
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



$('#example3').on('click', '.desactivar', function () {
    var data = table.row($(this).parents('tr')).data();
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de desactivar al cliente?',
        text: "una vez desactivado no podra hacer ninguna operacion",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {

            Modificar_Estatus(data.id, '17');
        }
    })
})




function Modificar_Estatus(id, id_estado) {

    var data = {
        objUsuario: {
            id: id,
            id_estado: id_estado
        }
    }
    $.ajax({
        method: "POST",
        url: "Empleados.aspx/actulizares",
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

$('#example3').on('click', '.activar', function () {
    var data = table.row($(this).parents('tr')).data();
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de activar al cliente?',
        text: "se le dara todo los accesos a las operaciones",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.id, '16');

        }
    })
})


$(document).ready(function () {
    let $pais = document.getElementById('cbm_pais')
    let $Departamento = document.getElementById('cbm_Departemento')
    let $Provincia = document.getElementById('cbm_provincia')
    let $Distrito = document.getElementById('cbm_distrito')


    function cargarpais() {

        $.ajax({
            type: "POST",
            url: "Empleados.aspx/llenar",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);
                let template = '<option class="form-control" selected disabled>-- Seleccione --</option>'

                $(datos).each(function () {
                    var option = $(document.createElement('option'));

                    option.text(this.nacionalidad);
                    option.val(this.idPais);
                    $pais.innerHTML = template;

                    $("#cbm_pais").append(option);
                });

            },
            error: function (msg) {
                $("#cbm_pais").text("NO SE ENCONTRARON REGISTROS");
            }
        });


    }

    cargarpais()

    function cargarDepartamento(sendDatos) {

        $.ajax({
            type: "POST",
            url: "Empleados.aspx/llenarnarDe",
            data: JSON.stringify(sendDatos),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);
                let template = '<option class="form-control" selected disabled>-- Seleccione --</option>'
                $(datos).each(function () {
                    template += `<option class="form-control" value="${this.idDepartamento}">${this.departamento}</option>`;

                });
                $Departamento.innerHTML = template;

            },
            error: function (msg) {
                $("#cbm_pais").text("NO SE ENCONTRARON REGISTROS");
            }
        });
    }


    function cargarProvincia(sendDatos) {

        $.ajax({
            type: "POST",
            url: "Empleados.aspx/llenarProvinvia",
            data: JSON.stringify(sendDatos),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);


                let template = '<option class="form-control" selected disabled>-- Seleccione --</option>'
                $(datos).each(function () {

                    template += `<option class="form-control" value="${this.idProvincia}">${this.provincia}</option>`;

                });

                $Provincia.innerHTML = template;


            },
            error: function (msg) {
                $("#cbm_pais").text("NO SE ENCONTRARON REGISTROS");
            }
        });
    }


    function cargarDistrito(sendDatos) {

        $.ajax({
            type: "POST",
            url: "Empleados.aspx/llenarDistrito",
            data: JSON.stringify(sendDatos),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);

                let template = '<option class="form-control" selected disabled>-- Seleccione --</option>'
                $(datos).each(function () {

                    template += `<option class="form-control" value="${this.idDistrito}">${this.distrito}</option>`;

                });

                $Distrito.innerHTML = template;


            },
            error: function (msg) {
                $("#cbm_pais").text("NO SE ENCONTRARON REGISTROS");
            }
        });
    }

    $pais.addEventListener('change', () => {
        const id = $pais.value


        const sendDatos = {
            obejto: {
                id: id
            }
        }

        cargarDepartamento(sendDatos)
        $Provincia.innerHTML = ''
        $Distrito.innerHTML = ''

    })

    $Departamento.addEventListener('change', () => {
        const idf = $Departamento.value

        const sendDatos = {
            objeto: {
                id: idf
            }
        }

        cargarProvincia(sendDatos)

        $Distrito.innerHTML = ''


    })

    $Provincia.addEventListener('change', () => {
        const id = $Provincia.value

        const sendDatos = {
            objeto: {
                id: id
            }
        }
        cargarDistrito(sendDatos)
        $Distrito.innerHTML = ''
    })



    function cargarEstado() {

        $.ajax({
            type: "POST",
            url: "Empleados.aspx/llenarEstado",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);

                $(datos).each(function () {
                    var option = $(document.createElement('option'));

                    option.text(this.nombre_estado);
                    option.val(this.id_estado);

                    $("#cb_estado").append(option);
                });

            },
            error: function (msg) {
                $("#cbm_pais").text("NO SE ENCONTRARON REGISTROS");
            }
        });

    }

    cargarEstado()

    function cargarGenero() {

        $.ajax({
            type: "POST",
            url: "Empleados.aspx/llenarGenero",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);

                $(datos).each(function () {
                    var option = $(document.createElement('option'));

                    option.text(this.nombre_genero);
                    option.val(this.id_genero);

                    $("#cb_genero").append(option);
                });

            },
            error: function (msg) {
                $("#cbm_pais").text("NO SE ENCONTRARON REGISTROS");
            }
        });


    }
    cargarGenero()
});