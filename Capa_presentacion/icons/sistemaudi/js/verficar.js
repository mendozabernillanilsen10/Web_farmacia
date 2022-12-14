

var table;
function lista(){
     table = $("#tabla_usuario").DataTable({
       "ordering":false,   
       "bLengthChange":false,
       "searching": { "regex": false },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/check/listar.php",
           type:'POST'
       },
       "columns":[
            {"data":"posicion"},
            {"data":"razonSocial" },
            {"data":"ResultadosAudi",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/proyect.png">'+' <a href="../archivos/modeloCheck/'+data+'">' +data+ '</a>' 

              }  
            },
            {"data":"informafinal" ,
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/proyect.png">'+' <a href="../archivos/modeloCheck/'+data+'">' +data+ '</a>' 

              }  
            }, 
            
            
           {"defaultContent":"<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>   &nbsp;   <button style='font-size:13px;' type='button' class='desactivar btn btn-danger'><i class='fa fa-trash'></i></button>"}
       ],

       
       "paging": true,
       "lengthChange": true,
       "searching": true,
       "ordering": true,
       "info": true,
       "autoWidth": false,
       "responsive": true,
       dom: 'Bfrtip',
       buttons: [
         'copy', 'csv', 'excel', 'pdf', 'print'
       ]
       ,
       "language":idioma_espanol,
       select: true
   });
   document.getElementById("tabla_usuario_filter").style.display="none";
   $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

}
function filterGlobal() {
    $('#tabla_usuario').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}
function AbrirModalRegistro(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}


function listar_combo_Empresa(){
    $.ajax({
        "url":"../controlador/planes/lista_combo_empresa.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbm_empresa").html(cadena);
            $("#cbm_empresa").html(cadena);

        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_empresa").html(cadena);
            $("#cbm_empresa").html(cadena);
        }
    })
}
function LimpiarRegistro(){
    $("#txt_usu").val("");
    $("#txt_con1").val("");
    $("#txt_con2").val("");
    $("#txt_nombre").val("");
    $("#txt_Apellido").val("");
}





function Registrar(){
    var cbm_empresa = $("#cbm_empresa").val();
    var resultado = $('#Resuktado').prop('files')[0]; 
    var Infor = $('#Informe').prop('files')[0];


    var form_data = new FormData();
        form_data.append("id",cbm_empresa);
        form_data.append("Result",resultado);
        form_data.append("informe",Infor);
  
 
    $.ajax({ 
        url: "../controlador/check/agregar.php",                      //Server api to receive the file
        type: "POST",
        dataType: 'script',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,

    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                $("#modal_registro").modal('hide');
                Swal.fire("Mensaje De Confirmacion","Datos correctamente,  Registro de planes ","success")            
                .then ( ( value ) =>  {
                    LimpiarRegistro();
                    table.ajax.reload();
                }); 
            }else{
                return Swal.fire("Mensaje De Advertencia","Lo sentimos,  ya se encuentra en nuestra base de datos","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar el registro","error");
        }
    })
}

$('#tabla_usuario').on('click','.editar',function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    $("#id_edith").val(data.id);
    $("#nombreresul").val(data.ResultadosAudi);
    $("#nombreFinal").val(data.informafinal);
    $("#id_empresa").val(data.id_empresa);
       
})


function Modificar(){
    var  id_edith =$("#id_edith").val();
    var  nombreresul=$("#nombreresul").val();
    var  nombreFinal=$("#nombreFinal").val();
    var fileResultado = $('#edithResuktado').prop('files')[0]; 
    var edithInforme = $('#edithInforme').prop('files')[0]; 
    var id_empresa =$('#d_empresa').val();
    var form_data = new FormData();
    form_data.append("id",id_edith);
    form_data.append("nombreresul",nombreresul);
    form_data.append("nombreFinal",nombreFinal);
    form_data.append("fileResultado",fileResultado);
    form_data.append("edithInforme",edithInforme);
    form_data.append("id_empresa",id_empresa);

    $.ajax({ 
        url: "../controlador/check/editar.php",                      //Server api to receive the file
        type: "POST",
        dataType:'script',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
         }).done(function(resp){
            if(resp>0){
                    $("#modal_editar").modal('hide');
                    Swal.fire("Mensaje De Confirmacion","Datos correctamente,actualizado ","success")            
                    .then ( ( value ) =>  {
                        table.ajax.reload();
                    }); 
                
            }else{
                Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar la actulizacion de los datos ","error");
            }
        })

    }






$('#tabla_usuario').on('click','.desactivar',function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de eliminar ?',
        text: " Si no esta seguro cancele",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.id);
        }
      })
})

function Modificar_Estatus(id){
    $.ajax({
        "url":"../controlador/check/eliminar.php",
        type:'POST',
        data:{
            id:id,
            
        }
    }).done(function(resp){
        if(resp>0){
            Swal.fire("Mensaje De Confirmacion","se elimino con exito","success")            
            .then ( ( value ) =>  {
                table.ajax.reload();
            }); 
        }
    })


}

function listar_combo_Empresa(){
    $.ajax({
        "url":"../controlador/actividades/listar_combo_empresa.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][1]+"'>"+data[i][2]+"</option>";
            }
            $("#cbm_empresa").html(cadena);
            $("#cbm_empresa").html(cadena);

        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_empresa").html(cadena);
            $("#cbm_empresa").html(cadena);
        }
    })
}