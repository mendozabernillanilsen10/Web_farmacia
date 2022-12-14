

var table;
function listar_usuario(){
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
           "url":"../controlador/rol/controlador_rol.php",
           type:'POST'
       },
       "columns":[
            {"data":"posicion"},
            
            {"data":"rol_nombre"},  
           
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
function listar_combo_rol(){
    $.ajax({
        "url":"../controlador/usuario/controlador_combo_rol_listar.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbm_rol").html(cadena);
            $("#cbm_rol_editar").html(cadena);

        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_rol").html(cadena);
            $("#cbm_rol_editar").html(cadena);
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




function Modificar_Usuario(){

    var id = $("#txtidusuario").val();
    var usu = $("#txtusu_editar").val();
    var nombre =$("#txtedith_nombre").val();
    var apellido =$("#txt_edi_Apellido").val();
    var rol = $("#cbm_rol_editar").val();


    if( nombre.length==0 || apellido.length==0){
        return Swal.fire("Mensaje De Advertencia","Llene los campos vacios","warning");
    }

    $.ajax({
        "url":"../controlador/usuario/controlador_editar_datos.php",
        type:'POST',
        data:{
            usuario:usu,
            id:id,
            rol:rol,
            nombre:nombre,
            apellido:apellido
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















function Registrar_Usuario(){
    var usu = $("#txt_usu").val();
    var nombre =$("#txt_nombre").val();
    var apellido =$("#txt_Apellido").val();
    var contra = $("#txt_con1").val();
    var contra2 = $("#txt_con2").val();
    var rol = $("#cbm_rol").val();
    if(nombre.length==0 || apellido.length==0||  usu.length==0 ||  contra.length==0 || contra.length==0 || contra2.length==0  || rol.length==0){
        return Swal.fire("Mensaje De Advertencia","Llene los campos vacios","warning");
    }

    if(contra != contra2){
        return Swal.fire("Mensaje De Advertencia","Las contraseñas deben coincidir","warning");        
    }

    $.ajax({
        "url":"../controlador/usuario/controlador_usuario_registro.php",
        type:'POST',
        data:{
            usuario:usu,
            contrasena:contra2,
            rol:rol,
            nombre:nombre,
            apellido:apellido
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
            }else{
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, el nombre del usuario ya se encuentra en nuestra base de datos","warning");
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
    $("#txtidusuario").val(data.idusuario);
    $("#txtusu_editar").val(data.usu_nombre);
    $("#txtedith_nombre").val(data.nombre);
    $("#txt_edi_Apellido").val(data.apellido);
    $("#cbm_rol_editar").val(data.id_rol).trigger('change');   

})


$('#tabla_usuario').on('click','.activar',function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de activar al usuario?',
        text: "Una vez hecho esto el usuario  tendra acceso al sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.idusuario,'1');
        }
      })
})

$('#tabla_usuario').on('click','.desactivar',function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de desactivar al usuario?',
        text: "Una vez hecho esto el usuario no tendra acceso al sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.idusuario,'0');
        }
      })
})

function Modificar_Estatus(idusuario,estatus){
    var mensaje ="";
    if(estatus=='Acitvo'){
        mensaje="desactivo";
    }else{
        mensaje="desactivo";
    }
    $.ajax({
        "url":"../controlador/usuario/controlador_modificar_estatus_usuario.php",
        type:'POST',
        data:{
            idusuario:idusuario,
            estatus:estatus
        }
    }).done(function(resp){
        if(resp>0){
            Swal.fire("Mensaje De Confirmacion","El usuario se "+mensaje+" con exito","success")            
            .then ( ( value ) =>  {
                table.ajax.reload();
            }); 
        }
    })


}

