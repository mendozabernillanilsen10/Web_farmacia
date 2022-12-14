

var table;
function lista_revision(){
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
           "url":"../controlador/revision/lista_revicion.php",
           type:'POST'
       },
       "columns":[
            {"data":"posicion"},
            {"data":"razonSocial"},
            {"data":"Observacion"   }, 
            {"data":"PropuestaMejora"}, 
            
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




function Modificar_Datos(){

    var id = $("#id_edith").val();
    var observasion = $("#edith_observacion").val();
    var mejoraPro =$("#edith_Mejora").val();
    


    if( observasion.length==0 || mejoraPro.length==0){
        return Swal.fire("Mensaje De Advertencia","Llene los campos vacios","warning");
    }

    $.ajax({
        "url":"../controlador/revision/Editar_revision.php",
        type:'POST',
        data:{
            id:id,
            observasion:observasion,
            mejoraPro:mejoraPro,
        }
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


function Registromejora(){
    var cbm_empresa = $("#cbm_empresa").val();
    var txt_observacion =$("#txt_observacion").val();
    var txt_Mejora =$("#txt_Mejora").val();
   
    if(cbm_empresa.length==0 || txt_observacion.length==0||  txt_Mejora.length==0 ){
        return Swal.fire("Mensaje De Advertencia","Llene los campos vacios","warning");
    }

   
    $.ajax({
        "url":"../controlador/revision/registro_revision.php",
        type:'POST',
        data:{
            id:cbm_empresa,
            observacion:txt_observacion,
            mejora:txt_Mejora,
        }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                $("#modal_registro").modal('hide');
                Swal.fire("Mensaje De Confirmacion","Datos correctamente, Nuevo Usuario Registrado","success")            
                .then ( ( value ) =>  {
                    LimpiarRegistro();
                    table.ajax.reload();
                }); 
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
    $("#edith_observacion").val(data.Observacion);
    $("#edith_Mejora").val(data.PropuestaMejora);
})



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
        "url":"../controlador/revision/eliminarMejora.php",
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