

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
           "url":"../controlador/actividades/lista_actvidad.php",
           type:'POST'
       },
       "columns":[
            {"data":"posicion"},
            {"data":"razonSocial"},
            {"data":"fechaInicioActividad"   }, 
            {"data":"fechaFinActividad"}, 
            {"data":"Cronograma",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/actividades/'+data+'">' +data+ '</a>' 

              }}, 
            {"data":"matrizComparativa",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/actividades/'+data+'">' +data+ '</a>' 

              }},
            {"data":"registroRoles",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/actividades/'+data+'">' +data+ '</a>' 

              }}, 
            {"data":"ActaAperturaAudi",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/actividades/'+data+'">' +data+ '</a>' 

              }}, 
            {"data":"solicitudAcceso",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/actividades/'+data+'">' +data+ '</a>' 

              }},
            {"data":"avanceHallasgos",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/actividades/'+data+'">' +data+ '</a>' 

              }}, 
            {"data":"conclusionAudi",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/actividades/'+data+'">' +data+ '</a>' 

              }}, 
            {"data":"actaCierre",
            render: function (data, type, row ) {    
             return '<img  width="50" src="../archivos/iconos/archivo.png">'+' <a href="../archivos/actividades/'+data+'">' +data+ '</a>' 

              }},
           {"defaultContent":"<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>   &nbsp;   <button style='font-size:13px;' type='button' class='desactivar btn btn-danger'><i class='fa fa-trash'></i></button> "}
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


$('#tabla_usuario').on('click','.editar',function(){
    var data = table.row($(this).parents('tr')).data();
    if(table.row(this).child.isShown()){
        var data = table.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    $("#id").val(data.id);
    $("#incio").val(data.fechaInicioActividad);
    $("#tcxfinal").val(data.fechaFinActividad);

    $("#Cronograma").val(data.Cronograma);
    $("#matris").val(data.matrizComparativa);
    $("#roles").val(data.registroRoles);
    $("#acta").val(data.ActaAperturaAudi);
    $("#soli").val(data.solicitudAcceso);
    $("#avan").val(data.avanceHallasgos);
    $("#concl").val(data.conclusionAudi);
    $("#cierre").val(data.actaCierre);


})


function Modificar(){

    var id = $("#id").val();
    var incio  = $("#incio").val();
    var tcxfinal =$("#tcxfinal").val();
    var Cronograma =$("#Cronograma").val();
    var matris = $("#matris").val();
    var registroRolesT  = $("#roles").val();
    var ActaAperturaAudi =$("#acta").val();
    var solicitudAcceso =$("#soli").val();
    var avanceHallasgos = $("#avan").val();
    var conclusionAudi =$("#concl").val();
    var actaCierre = $("#cierre").val()

    var file_matriz = $('#file_matrizComparativa').prop('files')[0]; 
    var file_cronogrman = $('#file_cronod').prop('files')[0]; 
    var file_rol = $('#file_registroRoles').prop('files')[0]; 
    var file_acta = $('#file_ActaAperturaAudi').prop('files')[0]; 
    var file_solittt = $('#ffile_solicitudAcceso').prop('files')[0]; 
    var file_avanze = $('#file_avanceHallasgos').prop('files')[0]; 
    var file_co = $('#file_conclusionAudiA').prop('files')[0]; 
    var file_ac_sierre = $('#file_actaCierreP').prop('files')[0]; 

    var form_data = new FormData();
       form_data.append("id",id);
       form_data.append("Fincio",incio);
       form_data.append("Ftcxfinal",tcxfinal);
       form_data.append("NCronograma",Cronograma);
       form_data.append("NmatrizComparativa", matris);
       form_data.append("NregistroRoles",registroRolesT);
       form_data.append("NActaAperturaAudi",ActaAperturaAudi);
       form_data.append("NsolicitudAccesoTT",solicitudAcceso);
       form_data.append("NavanceHallasgos",avanceHallasgos);
       form_data.append("NconclusionAudi",conclusionAudi);
       form_data.append("NactaCierre",actaCierre);

       form_data.append("file_matriz", file_matriz );
       form_data.append("File_crono",file_cronogrman);
       form_data.append("file_role",file_rol);
       form_data.append("file_acta",file_acta );
       form_data.append("file_soli",file_solittt);
       form_data.append("file_avanze",file_avanze);
       form_data.append("file_conclusion",file_co);
       form_data.append("file_ac_sierre",file_ac_sierre);
     

    $.ajax({ 
        url: "../controlador/actividades/editar.php",                      //Server api to receive the file
        type: "POST",
        dataType: 'script',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,

    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                $("#modal_editar").modal('hide');
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



function Registrar_actividad(){
    var id_empresa= $('#cbm_empresa').val();
    var fechaInicioActividad= $('#fechaInicioActividad').val();
    var fechaFinActividad =$('#fechaFinActividad').val();
    var matrizComparativa = $('#matrizComparativa').prop('files')[0];
   var crono = $('#crono').prop('files')[0];

    var registroRoles =$('#registroRoles').prop('files')[0];
    var ActaAperturaAudi = $('#ActaAperturaAudi').prop('files')[0];
    var solicitudAcceso = $('#solicitudAcceso').prop('files')[0];
    var	avanceHallasgos= $('#avanceHallasgos').prop('files')[0];
    var conclusionAudi = $('#conclusionAudi').prop('files')[0];
    var actaCierre =$('#actaCierre').prop('files')[0];

    var form_data = new FormData();
        form_data.append("id_empresa",id_empresa);
        form_data.append("fechaInicioActividad",fechaInicioActividad);
        form_data.append("fechaFinActividad",fechaFinActividad);
        form_data.append("matriz",matrizComparativa);
        form_data.append("crono",crono);

        form_data.append("registroR",registroRoles);
        form_data.append("ActaAperturaAudi",ActaAperturaAudi);
        form_data.append("solicitudAcceso",solicitudAcceso);
        form_data.append("avanceHallasgos",avanceHallasgos);
        form_data.append("conclusionAudi",conclusionAudi);
        form_data.append("actaCierre",actaCierre);
       
    $.ajax({ 
        url: "../controlador/actividades/registro_actividad.php",                      //Server api to receive the file
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
            Modificar_Estatus(data.id,
                data.Cronograma,
                data.matrizComparativa,
                data.registroRoles,
                data.ActaAperturaAudi,
                data.solicitudAcceso,
                data.avanceHallasgos,
                data.conclusionAudi,
                data.actaCierre);
        }
      })
})



function Modificar_Estatus(id,Cronograma,matrizComparativa,registroRoles,
    ActaAperturaAudi,solicitudAcceso,avanceHallasgos,conclusionAudi,actaCierre){
    
    $.ajax({
        "url":"../controlador/actividades/eliminar.php",
        type:'POST',
        data:{
            id:id,
            Cronograma:Cronograma,
            matrizComparativa:matrizComparativa,
            registroRoles:registroRoles,
            ActaAperturaAudi:ActaAperturaAudi,
            solicitudAcceso:solicitudAcceso,
            avanceHallasgos:avanceHallasgos,
            conclusionAudi:conclusionAudi,
            actaCierre:actaCierre
        }
    }).done(function(resp){
        if(resp>0){
            Swal.fire("Mensaje De Confirmacion"," se elimno  con exito","success")            
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