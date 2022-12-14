

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
           "url":"../controlador/planes/lista_planes.php",
           type:'POST'
       },
       "columns":[
            {"data":"posicion"},
            {"data":"fehaInicioAudi"},
            {"data":"fechaFinAudi"}, 
            {"data":"cronogramaAudia",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/plan/'+data+'">' +data+ '</a>' 

              }  
            },
            {"data":"DocumentoAlcanceAudi"
            ,
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/plan/'+data+'">' +data+ '</a>' 

              } 
        }, 
            {"data":"razonSocial"},
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

function Registrar_Plan(){
    var fecha_audi = $("#fecha_audi").val();
    var fecha_final =$("#fecha_final").val();
    var cbm_empresa =$("#cbm_empresa").val();
    var cronograma = $('#cronograma').prop('files')[0]; 
    var documentoAlcanze = $('#documentoAlcanze').prop('files')[0];


    if(cbm_empresa.length==0 ){
        return Swal.fire("Mensaje De Advertencia","Llene los campos vacios","warning");
    }


    var form_data = new FormData();
        form_data.append("fecha_audi",fecha_audi);
        form_data.append("fecha_final",fecha_final);
        form_data.append("cbm_empresa",cbm_empresa);
        form_data.append("cronograma",cronograma);
        form_data.append("documentoAlcanze",documentoAlcanze);
 
       
    $.ajax({ 
        url: "../controlador/planes/registro_planes.php",                      //Server api to receive the file
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
    $("#editH_edith").val(data.id);
    $("#edith_fecha_audi").val(data.fehaInicioAudi);
    $("#edith_fecha_final").val(data.fechaFinAudi);
    $("#edith_Nombre_cronograma").val(data.cronogramaAudia);
    $("#edith_Nombre_Alca").val(data.DocumentoAlcanceAudi);

})
function LimpiarRegistro(){
    $("#fecha_audi").val("");
    $("#fecha_final").val("");
    $("#cbm_empresa").val("");
    $("#txt_nombre").val("");
    $("#cronograma").val("");
    $("#edith_fecha_audi").val("");
    $("#edith_fecha_final").val("");
    $("#edith_Nombre_cronograma").val("");
    $("#edith_Nombre_Alca").val("");
    $("#edith_cronograma").val("");
    $("#edith_documentoAlcanze").val("");
}


function Modificar(){
        var id = $("#editH_edith").val();
        var edith_fecha_audi = $("#edith_fecha_audi").val();
        var edith_fecha_final = $("#edith_fecha_final").val();
        var edith_Nombre_cronograma=$("#edith_Nombre_cronograma").val();
        var edith_Nombre_Alca =$("#edith_Nombre_Alca").val();
        var file_crono = $('#edith_cronograma').prop('files')[0]; 
        var file_alcan = $('#edith_documentoAlcanze').prop('files')[0]; 
    
    if(  edith_fecha_audi.length==0 ||edith_fecha_final.length==0 || edith_Nombre_cronograma.length==0 
       || edith_Nombre_Alca.length==0 ){
            return Swal.fire("Campos vacios ","Por Favor revice que todos los campos esten llenos","warning");
    
       }
    
    var form_data = new FormData();
    form_data.append("edith_fecha_audi",edith_fecha_audi);
    form_data.append("edith_fecha_final",edith_fecha_final);
    form_data.append("edith_Nombre_cronograma",edith_Nombre_cronograma);
    form_data.append("edith_Nombre_Alca",edith_Nombre_Alca);
    form_data.append("file_crono",file_crono);
    form_data.append("file_alcan",file_alcan);
    form_data.append("id",id);

    $.ajax({ 
        url: "../controlador/planes/editar.php",                      //Server api to receive the file
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
                        LimpiarRegistro();
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
        title: 'Esta seguro de Eliminar ?',
        text: "los datos se elimianran del sistema  por completo ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.id , data.idempresa);
        }
      })
})

function Modificar_Estatus(id,idempresa){
   
    $.ajax({
        "url":"../controlador/planes/eliminar.php",
        type:'POST',
        data:{
            id:id,
            idempresa:idempresa
        }
    }).done(function(resp){
        if(resp>0){
            Swal.fire("Mensaje De Confirmacion","los datos se elimianron  con exito","success")            
            .then ( ( value ) =>  {
                table.ajax.reload();
            }); 
        }
    })


}

