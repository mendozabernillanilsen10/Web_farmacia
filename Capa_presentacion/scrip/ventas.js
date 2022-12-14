

$(document).ready(function () {

    function cargarClientes() {

        $.ajax({
            type: "POST",
            url: "Ventas.aspx/llenarCLientes",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);

                $(datos).each(function () {
                    var option = $(document.createElement('option'));

                    option.text(this.Nombre + " " + this.Apellido);
                    option.val(this.id);

                    $("#cmdClientes").append(option);
                });

            },
            error: function (msg) {
                $("#cmdClientes").text("NO SE ENCONTRARON REGISTROS");
            }
        });

    }
    cargarClientes()



    function cargarComprobantes() {

        $.ajax({
            type: "POST",
            url: "Ventas.aspx/llenarComprobantes",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = $.parseJSON(msg.d);

                $(datos).each(function () {
                    var option = $(document.createElement('option'));

                    option.text(this.nombre_tipo_comprobante);
                    option.val(this.id_tipo_comprobante);

                    $("#cmdComprobante").append(option);
                });

            },
            error: function (msg) {
                $("#cmdComprobante").text("NO SE ENCONTRARON REGISTROS");
            }
        });

    }
    cargarComprobantes()

});
var table;
function listar() {

    table = $("#listarProductos").DataTable({
        "aProcessing": true,//activamos el procedimiento del datatable
        "aServerSide": true,//paginacion y filrado realizados por el server
        dom: 'Bfrtip',//definimos los elementos del control de la tabla
        buttons: [

        ],
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
                    return " <span class='badge light badge-success'> <i class='fa fa-circle text-success me-1'></i> s/" + data + ".00 </span>"

                }

            },
            { "data": "presentacion_producto" },
            { "data": "cantidad" },



            { "data": "nombre_tipo_producto" },
            { "data": "nombre_marca" },

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
            { "defaultContent": "<button style='font-size:13px;' type='button' class='agregarDetalle btn btn-primary'><i class='fa fa-plus'></i></button> " }
        ]
         , "language": idioma_espanol,
        "bDestroy": true,
        "iDisplayLength": 5,//paginacion
        "order": [[0, "desc"]]//ordenar (columna, orden)

    });
    

    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function () {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

}




var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
$("#fecha").val(today);





//declaramos variables necesarias para trabajar con las compras y sus detalles
var impuesto = 18;
var cont = 0;
var detalles = 0;



$('#listarProductos').on('click', '.agregarDetalle', function () {
    var data = table.row($(this).parents('tr')).data();
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }
    
    var cantidad = 1;
    var descuento = 0;

    if (data.id_producto != "") {
        var subtotal = cantidad * data.precio_producto;
        var fila = '<tr class="filas" id="fila' + cont + '">' +
            '<td><button type="button" class="btn btn-danger" onclick="eliminarDetalle(' + cont + ')">X</button></td>' +
            '<td><input type="hidden" name="idarticulo[]" value="' + data.id_producto + '">' + data.nombre_producto + '</td>' +
            '<td><input type="number" name="cantidad[]" id="cantidad[]" value="' + cantidad + '"></td>' +
            '<td><input type="number" name="precio_venta[]" id="precio_venta[]" value="' + data.precio_producto + '"></td>' +
            '<td><input type="number" name="descuento[]" value="' + descuento + '"></td>' +
            '<td><span id="subtotal' + cont + '" name="subtotal">' + subtotal + '</span></td>' +
            '<td><button type="button" onclick="modificarSubtotales()" class="btn btn-success"><i class="fa fa-refresh"></i></button></td>' +
            '</tr>';
        cont++;
        detalles++;
        $('#detalles').append(fila);
        modificarSubtotales();

    } else {
        alert("error al ingresar el detalle, revisar las datos del articulo ");
    }

})



function modificarSubtotales() {
    var cant = document.getElementsByName("cantidad[]");
    var prev = document.getElementsByName("precio_venta[]");
    var desc = document.getElementsByName("descuento[]");
    var sub = document.getElementsByName("subtotal");


    for (var i = 0; i < cant.length; i++) {
        var inpV = cant[i];
        var inpP = prev[i];
        var inpS = sub[i];
        var des = desc[i];


        inpS.value = (inpV.value * inpP.value) - des.value;
        document.getElementsByName("subtotal")[i].innerHTML = inpS.value;
    }

    calcularTotales();
}

function calcularTotales() {
    var sub = document.getElementsByName("subtotal");
    var total = 0.0;

    for (var i = 0; i < sub.length; i++) {
        total += document.getElementsByName("subtotal")[i].value;
    }
    $("#total").html("S/." + total);
    $("#total_venta").val(total);
    evaluar();
}

function evaluar() {

    if (detalles > 0) {
        $("#btnGuardar").show();
    }
    else {
        $("#btnGuardar").hide();
        cont = 0;
    }
}

function eliminarDetalle(indice) {
    $("#fila" + indice).remove();
    calcularTotales();
    detalles = detalles - 1;

}

init();






























