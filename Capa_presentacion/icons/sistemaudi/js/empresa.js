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
           "url":"../controlador/empresa/controlador_listar_empresa.php",
           type:'POST'
       },
       "columns":[
            {"data":"posicion"},
            {"data":"logo",
               render: function (data, type, row ) {               
                return '<enter><img  src="../archivos/empresa/'+data+'" whith="80" height="80" /></enter>' 
             }
        } ,
            {"data":"razonSocial"},
            {"data":"ruc"},
            {"data":"direccion"} ,
            {"data":"telefono"} ,
            {"data":"email"} ,
            {"data":"gerente"} ,
            {"data":"estado",
             render: function (data, type, row ) {
                if(data=='1'){
                   return "<span class='label label-success'>Acitvo</span>";                   
               }else{
                 return "<span class='label label-danger'>Desactivo</span>";                 
               }
             }
           } ,
           {"defaultContent":"<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>   &nbsp;   <button style='font-size:13px;' type='button' class='desactivar btn btn-danger'><i class='fa fa-trash'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success'><i class='fa fa-check'></i></button>"}
       ],
       
       "paging": 100,
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

function AbrirModalRegistro(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}




function LimpiarRegistro(){
    $("#txt_usu").val("");
    $("#txt_con1").val("");
    $("#txt_con2").val("");
}



function Registrar_Empresa(){
   var  txt_Razon_social =$("#txt_Razon_social").val();
   var  txt_Ruc =$("#txt_Ruc").val();
   var txt_Direccion =$("#txt_Direccion").val();
   var  txt_telefono =$("#txt_telefono").val();
   var txt_email =$("#txt_email").val();
   var  txt_gerente =$("#txt_gerente").val();
   var fileP = $('#imagenfoto').prop('files')[0]; 
   
   //Fetch the file
   if( txt_Razon_social.length==0 ||txt_Ruc.length==0|| txt_Direccion.length==0 ||
    txt_telefono.length==0||txt_email.length==0 || txt_gerente.length==0 ){
        return Swal.fire("Campos vacios ","Por Favor revice que todos los campos esten llenos","warning");

   }
    var imagefile = fileP.type;
    var match= ["image/jpeg","image/png","image/jpg"];
    if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
        return Swal.fire("Los tipos de de archivo dever con extencion ","(JPEG/JPG/PNG)","warning");


        $("#file").val('');
        return false;
    }

  var form_data = new FormData();
  form_data.append("txt_Razon_social",txt_Razon_social);
  form_data.append("txt_Ruc",txt_Ruc);
  form_data.append("txt_Direccion",txt_Direccion);
  form_data.append("txt_telefono",txt_telefono);
  form_data.append("txt_email",txt_email);
  form_data.append("txt_gerente",txt_gerente);
  form_data.append("file",fileP);
  
    $.ajax({ 
        url: "../controlador/empresa/controlador_empresa_empresa.php",                      //Server api to receive the file
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
                Swal.fire("Mensaje De Confirmacion","Datos correctamente, Nuevo Usuario producto","success")            
                .then ( ( value ) =>  {
                    LimpiarRegistro();
                    table.ajax.reload();
                }); 
            }else{
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, el nombre del producto ya se encuentra en nuestra base de datos","warning");
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
    $("#idEmpresa").val(data.id);
    $("#edith_Razon_social").val(data.razonSocial);
    $("#edtith_Ruc").val(data.ruc);
    $("#edith_Direccion").val(data.direccion);
    $("#edtih_telefono").val(data.telefono);
    $("#edtih_email").val(data.email);
    $("#edith_gerente").val(data.gerente);
    $("#NombreLogo").val(data.logo);

})


function Modificar(){
    var  edit_idEmpresa =$("#idEmpresa").val();
    var  edith_Razon_social=$("#edith_Razon_social").val();
    var  edtihRuc=$("#edtith_Ruc").val();
    var  edith_direc=$("#edith_Direccion").val();
    var  edith_telefone=$("#edtih_telefono").val();
    var  edtih_email=$("#edtih_email").val();
    var edith_gerente = $("#edith_gerente").val();
    var NombreLogo =$("#NombreLogo").val();
    var file = $('#fotoLogo').prop('files')[0]; 
    
    if( edith_Razon_social.length==0 ||edtihRuc.length==0|| edith_direc.length==0 ||
        edith_telefone.length==0||edith_telefone.length==0 || edtih_email.length==0|| edith_gerente.length==0){
            return Swal.fire("Campos vacios ","Por Favor revice que todos los campos esten llenos","warning");
    
       }
    
    var form_data = new FormData();
    form_data.append("edit_idEmpresa",edit_idEmpresa);
    form_data.append("edith_Razon_social",edith_Razon_social);
    form_data.append("edtihRuc",edtihRuc);
    form_data.append("edith_direc",edith_direc);
    form_data.append("edith_telefone",edith_telefone);
    form_data.append("edtih_email",edtih_email);
    form_data.append("edith_gerente",edith_gerente);
    form_data.append("NombreLogo",NombreLogo);
    form_data.append("foto",file);

    $.ajax({ 
        url: "../controlador/empresa/EmpresaEditar.php",                      //Server api to receive the file
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




$('#tabla_usuario').on('click','.activar',function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de activar la Empresa?',
        text: " se activara la empresa",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.id,'1');
        }
      })
})
$('#tabla_usuario').on('click','.desactivar',function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de desactivar al empresa?',
        text: "se desactivar la empresa",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.id,'0');
        }
      })
})




function Modificar_Estatus(edit_idEmpresa,estado){
    var mensaje ="";
    if(estado=='Acitvo'){
        mensaje="desactivo";
    }else{
        mensaje="desactivo";
    }
    $.ajax({
        "url":"../controlador/empresa/actualizarEstado.php",
        type:'POST',
        data:{
            edit_idEmpresa:edit_idEmpresa,
            estado:estado
        }
    }).done(function(resp){
        if(resp>0){
            Swal.fire("Mensaje De Confirmacion","la empresa  se "+mensaje+" con exito","success")            
            .then ( ( value ) =>  {
                table.ajax.reload();
            }); 
        }
    })


}

