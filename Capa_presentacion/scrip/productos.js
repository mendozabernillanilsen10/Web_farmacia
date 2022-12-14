

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
            url: "vista_productos.aspx/llenarProducto",
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            data: function (d) {
                return JSON.stringify(d);
            },
            dataSrc: "d.data"
        },
        columns: [

            { "data": "nombre_producto" },
            {
                "data": "precio_producto"


                ,
                render: function (data, type, row) {
                    return  " <span class='badge light badge-success'> <i class='fa fa-circle text-success me-1'></i> s/"+data  +".00 </span>"
                   
                }

            },
            { "data": "presentacion_producto" },
            { "data": "cantidad" },



            { "data": "nombre_tipo_producto" },
            { "data":  "nombre_marca" },

            {
                "data": "nombre_estado",
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


function Registrar() {
    var cantidad = $('#cantidad').val();
    var nombre = $('#nombre').val();
    var precio = $('#precio').val();
    var presentacion = $('#presentacion').val();
    var tipoP = $('#cbm_tipo_productos').val();
    var cbm_tipo_productos = $('#cbm_tipo_productos').val();
    var cbm_Marca = $('#cbm_Marca').val();
    var subCategoria = $('#cbm_sub_categoria').val();
    var cb_estado = $('#cb_estado').val();

    if (nombre.length == 0 || precio.length == 0 || presentacion.length == 0) {
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios", "warning");
    }

    var data = {
        p: {
            nombre_producto: nombre,
            precio_producto: precio,
            presentacion_producto: presentacion,
            nombre_tipo_producto: tipoP,
            id_marca: cbm_Marca,
            id_tipo_producto: cbm_tipo_productos,
            id_sub_categoria: subCategoria,
            id_estado: cb_estado,
            cantidad: cantidad

        }
    }
    $("#exampleModal").modal('hide');//ocultamos el modal
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal



    $.ajax({
        method: "POST",
        url: "vista_productos.aspx/insertarProductos",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (info) {

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




$('#example3').on('click', '.editar', function () {
    var data = table.row($(this).parents('tr')).data();
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }
    $("#EditarModal").modal({ backdrop: 'static', keyboard: false })
    $("#EditarModal").modal('show');

    $("#id").val(data.id_producto);
    $("#edith_nombre").val(data.nombre_producto);
    $("#edith_precio").val(data.precio_producto);
    $("#edithPrecentacion").val(data.presentacion_producto);
    $("#edith_cantidad").val(data.cantidad)


})

function ActulizarDatos() {
    let id = $('#id').val();
    let nombre = $('#edith_nombre').val();
    let precio = $('#edith_precio').val();
    let presentacion = $('#edithPrecentacion').val();
    let cantidad = $('#edith_cantidad').val();
    var data = {
        p: {
            id_producto: id,
            nombre_producto: nombre,
            precio_producto: precio,
            presentacion_producto: presentacion,
            cantidad: cantidad
        }
    }
  

            $("#EditarModal").modal('hide');//ocultamos el modal
            $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
            $('.modal-backdrop').remove();//eliminamos el backdrop del modal


    $.ajax({
       
        method: "POST",
        url: "vista_productos.aspx/actulizarProducto",
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
        title: 'Esta seguro de desactivar producto?',
        text: "sera desactivado ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {

            Modificar_Estatus(data.id_producto, '17');
        }
    })
})




function Modificar_Estatus(id, id_estado) {

    var data = {
        ob: {
            id: id,
            id_estado: id_estado
        }
    }
    $.ajax({
        method: "POST",
        url: "vista_productos.aspx/actulizares",
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
        text: "se activara",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.id_producto, '16');

        }
    })
})


$(document).ready(function () {
    let $categorias = document.getElementById('cbm_categoria')
    let $subC = document.getElementById('cbm_sub_categoria')

    function cargartipoProducto() {

        $.ajax({
            type: "POST",
            url: "vista_productos.aspx/listarTipoProducto",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);
                $(datos).each(function () {
                    var option = $(document.createElement('option'));

                    option.text(this.nombre_tipo_producto);
                    option.val(this.id_tipo_producto);
                    $("#cbm_tipo_productos").append(option);
                });

            },
            error: function (msg) {
                $("#cbm_pais").text("NO SE ENCONTRARON REGISTROS");
            }
        });


    }

    cargartipoProducto()

    function cargarMarca() {

        $.ajax({
            type: "POST",
            url: "vista_productos.aspx/listarMarca",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);
                $(datos).each(function () {
                    var option = $(document.createElement('option'));

                    option.text(this.nombre_marca);
                    option.val(this.id_marca);
                    $("#cbm_Marca").append(option);
                });

            },
            error: function (msg) {
                $("#cbm_Marca").text("NO SE ENCONTRARON REGISTROS");
            }
        });


    }



    cargarMarca()

   
    function cargarCategorias() {

        $.ajax({
            type: "POST",
            url: "vista_productos.aspx/listarCategorias",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);

                let template = '<option class="form-control" selected disabled>-- Seleccione --</option>'
                $(datos).each(function () {

                    template += `<option class="form-control" value="${this.id_categoria}">${this.nombre_categoria}</option>`;

                });

                $categorias.innerHTML = template;


            },
            error: function (msg) {
                $("#cbm_categoria").text("NO SE ENCONTRARON REGISTROS");
            }
        });
    }

    cargarCategorias()


    function cargarSubCategoria(sendDatos) {

        $.ajax({
            type: "POST",
            url: "vista_productos.aspx/llenarSubCategorias",
            data: JSON.stringify(sendDatos),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);

                let template = '<option class="form-control" selected disabled>-- Seleccione --</option>'
                $(datos).each(function () {

                    template += `<option class="form-control" value="${this.id_sub_categoria}">${this.nombre_sub_categoria}</option>`;

                });

                $subC.innerHTML = template;
            },
            error: function (msg) {
                $("cbm_sub_categoria").text("NO SE ENCONTRARON REGISTROS");
            }
        });
    }


    $categorias.addEventListener('change', () => {
        const id = $categorias.value

        const sendDatos = {
            objeto: {
                id: id
            }
        }

        cargarSubCategoria(sendDatos)


    })

    function cargarEstado() {

        $.ajax({
            type: "POST",
            url: "Vista_Clientes.aspx/llenarEstado",
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
   
});