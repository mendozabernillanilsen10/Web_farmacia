<?php
    require '../../modelo/modelo_actividades.php';
    require '../../modelo/randow.php';
    require_once '../../modelo/modelo_conexion.php';
    $MU = new Actividades();
    $R= new randow();

    $conexion = new conexion();
    $conexion->conectar();

    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');

    $fecha_inicio = htmlspecialchars(trim(date('Y-m-d', strtotime($_POST['Fincio']))),ENT_QUOTES,'UTF-8');
    $fecha_final = htmlspecialchars(trim(date('Y-m-d', strtotime($_POST['Ftcxfinal']))),ENT_QUOTES,'UTF-8');
    $Namecrono = htmlspecialchars($_POST['NCronograma'],ENT_QUOTES,'UTF-8');
    $matris = htmlspecialchars($_POST['NmatrizComparativa'],ENT_QUOTES,'UTF-8');
    $Nrole = htmlspecialchars($_POST['NregistroRoles'],ENT_QUOTES,'UTF-8');
    $NActaAperturaAudi = htmlspecialchars($_POST['NActaAperturaAudi'],ENT_QUOTES,'UTF-8');
    $solictaccess= htmlspecialchars($_POST['NsolicitudAccesoTT'],ENT_QUOTES,'UTF-8');
   
    $NavanceHallasgos = htmlspecialchars($_POST['NavanceHallasgos'],ENT_QUOTES,'UTF-8');
    $NconclusionAudi = htmlspecialchars($_POST['NconclusionAudi'],ENT_QUOTES,'UTF-8');
    $NactaCierre = htmlspecialchars($_POST['NactaCierre'],ENT_QUOTES,'UTF-8');
    
    if( empty($_FILES["file_matriz"]["tmp_name"])
   and empty($_FILES['file_cronogrman']['name'])
   and empty($_FILES['file_roles']['name'])
   and empty($_FILES['file_acta']['name'])
   and empty($_FILES['file_soli']['name'])
   and empty($_FILES['file_avanze']['name'])
   and empty($_FILES['file_conclusion']['name'])
   and empty($_FILES['file_ac_sierre']['name'])){
   
       $sql="UPDATE actividades SET fechaInicioActividad='$fecha_inicio',fechaFinActividad='$fecha_final' WHERE id='$id'";
        
   
       if($conexion->conexion->query($sql)){
           echo 1;
       }
           else{
               echo 0;
       }
   }else if(empty($_FILES['file_cronogrman']['name'])
       and empty($_FILES['file_roles']['name'])
       and empty($_FILES['file_acta']['name'])
       and empty($_FILES['file_soli']['name'])
       and empty($_FILES['file_avanze']['name'])
       and empty($_FILES['file_conclusion']['name'])
       and empty($_FILES['file_ac_sierre']['name']) ){
        
        unlink("../../archivos/actividades/".$matris);  
        
        $target_directory= "../../archivos/actividades/";

        $target_file = $target_directory.basename($_FILES["file_matriz"]["name"]);   
        $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $nombrematrix= "Acti_matrix_".$id."_".$R->radowCadena(5).".".$filetype;
        $newfilename01 = $target_directory.$nombrematrix;

        if(move_uploaded_file($_FILES["file_matriz"]["tmp_name"],$newfilename01) ){

            $sql = "UPDATE  actividades SET fechaInicioActividad	='$fecha_inicio',
                fechaFinActividad='$fecha_final' , matrizComparativa='$nombrematrix' WHERE id='$id'";   
            if($conexion->conexion->query($sql)){
                 echo 1;
        }
        else{
            echo 0;
        }

        }

        

    }else if ( 
        empty($_FILES['file_roles']['name'])
        and empty($_FILES['file_acta']['name'])
        and empty($_FILES['file_soli']['name'])
        and empty($_FILES['file_avanze']['name'])
        and empty($_FILES['file_conclusion']['name'])
        and empty($_FILES['file_ac_sierre']['name']) ){

            unlink("../../archivos/actividades/".$matris);  
            unlink("../../archivos/actividades/".$Namecrono);  

            $target_directory= "../../archivos/actividades/";

            $target_file = $target_directory.basename($_FILES["file_matriz"]["name"]);   
            $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            $nombrematrix= "Acti_matrix_".$id."_".$R->radowCadena(5).".".$filetype;
            $newfilename01 = $target_directory.$nombrematrix;

                // crongogramas
            $target_file02 = $target_directory.basename($_FILES["File_crono"]["name"]);  
            $filetype02 = strtolower(pathinfo($target_file02,PATHINFO_EXTENSION));
            $cronoNombre = "Acti_Crono_".$id."_".$R->radowCadena(5).".".$filetype02;
            $newfilename02 = $target_directory.$cronoNombre;

            if(move_uploaded_file($_FILES["file_matriz"]["tmp_name"],$newfilename01) and
            move_uploaded_file($_FILES["File_crono"]["tmp_name"],$newfilename02)){

                $sql = "UPDATE  actividades SET fechaInicioActividad	='$fecha_inicio',
                    fechaFinActividad='$fecha_final' , Cronograma ='$cronoNombre',matrizComparativa='$nombrematrix' WHERE id='$id'";   
                if($conexion->conexion->query($sql)){
                    echo 1;
            }
            else{
                echo 0;
            }

            }
    }else if (  empty($_FILES['file_acta']['name'])
                and empty($_FILES['file_soli']['name'])
                and empty($_FILES['file_avanze']['name'])
                and empty($_FILES['file_conclusion']['name'])
                and empty($_FILES['file_ac_sierre']['name'])){

                    unlink("../../archivos/actividades/".$matris);  
                    unlink("../../archivos/actividades/".$Namecrono);  
                    unlink("../../archivos/actividades/".$Nrole);  

                    $target_directory= "../../archivos/actividades/";

                    $target_file = $target_directory.basename($_FILES["file_matriz"]["name"]);   
                    $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
                    $nombrematrix= "Acti_matrix_".$id."_".$R->radowCadena(5).".".$filetype;
                    $newfilename01 = $target_directory.$nombrematrix;
        
                        // crongogramas
                    $target_file02 = $target_directory.basename($_FILES["File_crono"]["name"]);  
                    $filetype02 = strtolower(pathinfo($target_file02,PATHINFO_EXTENSION));
                    $cronoNombre = "Acti_Crono_".$id."_".$R->radowCadena(5).".".$filetype02;
                    $newfilename02 = $target_directory.$cronoNombre;
                     // roles 
                    $target_file03 = $target_directory.basename($_FILES["file_role"]["name"]);  
                    $filetype03 = strtolower(pathinfo($target_file03,PATHINFO_EXTENSION));
                    $Registroroles = "Acti_Roles_".$id."_".$R->radowCadena(5).".".$filetype03;
                    $newfilename03 = $target_directory.$Registroroles;

                    if(move_uploaded_file($_FILES["file_matriz"]["tmp_name"],$newfilename01) and
                        move_uploaded_file($_FILES["File_crono"]["tmp_name"],$newfilename02) and 
                        move_uploaded_file($_FILES["file_role"]["tmp_name"],$newfilename03) 
                        ){

                            $sql = "UPDATE  actividades SET fechaInicioActividad	='$fecha_inicio',
                                fechaFinActividad='$fecha_final' , Cronograma ='$cronoNombre',matrizComparativa='$nombrematrix',
                                registroRoles='$Registroroles' WHERE id='$id'";   
                            if($conexion->conexion->query($sql)){
                                echo 1;
                        }
                        else{
                            echo 0;
                        }

                        }


                    
        
    }else if (  
         empty($_FILES['file_soli']['name'])
        and empty($_FILES['file_avanze']['name'])
        and empty($_FILES['file_conclusion']['name'])
        and empty($_FILES['file_ac_sierre']['name'])){

        unlink("../../archivos/actividades/".$matris);  
        unlink("../../archivos/actividades/".$Namecrono);  
        unlink("../../archivos/actividades/".$Nrole);  
        unlink("../../archivos/actividades/".$NActaAperturaAudi); 



        $target_directory= "../../archivos/actividades/";

        $target_file = $target_directory.basename($_FILES["file_matriz"]["name"]);   
        $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $nombrematrix= "Acti_matrix_".$id."_".$R->radowCadena(5).".".$filetype;
        $newfilename01 = $target_directory.$nombrematrix;

            // crongogramas
        $target_file02 = $target_directory.basename($_FILES["File_crono"]["name"]);  
        $filetype02 = strtolower(pathinfo($target_file02,PATHINFO_EXTENSION));
        $cronoNombre = "Acti_Crono_".$id."_".$R->radowCadena(5).".".$filetype02;
        $newfilename02 = $target_directory.$cronoNombre;
         // roles 
        $target_file03 = $target_directory.basename($_FILES["file_role"]["name"]);  
        $filetype03 = strtolower(pathinfo($target_file03,PATHINFO_EXTENSION));
        $Registroroles = "Acti_Roles_".$id."_".$R->radowCadena(5).".".$filetype03;
        $newfilename03 = $target_directory.$Registroroles;


        //empty($_FILES['file_acta']['name'])

         // ActaAperturaAudi
        $target_file04 = $target_directory.basename($_FILES["file_acta"]["name"]);  
        $filetype04 = strtolower(pathinfo($target_file04,PATHINFO_EXTENSION));
        $ActaAperturaAudi = "Acti_Acta_Apertura_".$id."_".$R->radowCadena(5).".".$filetype04;
        $newfilename04 = $target_directory.$ActaAperturaAudi;
        

        if(move_uploaded_file($_FILES["file_matriz"]["tmp_name"],$newfilename01) and
            move_uploaded_file($_FILES["File_crono"]["tmp_name"],$newfilename02) and 
            move_uploaded_file($_FILES["file_role"]["tmp_name"],$newfilename03)  and
            move_uploaded_file($_FILES["file_acta"]["tmp_name"],$newfilename04) 

            ){

                $sql = "UPDATE  actividades SET fechaInicioActividad	='$fecha_inicio',
                    fechaFinActividad='$fecha_final' ,Cronograma ='$cronoNombre',matrizComparativa='$nombrematrix',
                    registroRoles='$Registroroles' , ActaAperturaAudi='$ActaAperturaAudi' WHERE id='$id'";   
                if($conexion->conexion->query($sql)){
                    echo 1;
            }
            else{
                echo 0;
            }

            }


        

}else if (
         empty($_FILES['file_avanze']['name'])
        and empty($_FILES['file_conclusion']['name'])
        and empty($_FILES['file_ac_sierre']['name'])){

        unlink("../../archivos/actividades/".$matris);  
        unlink("../../archivos/actividades/".$Namecrono);  
        unlink("../../archivos/actividades/".$Nrole);  
        unlink("../../archivos/actividades/".$NActaAperturaAudi); 
        unlink("../../archivos/actividades/".$solictaccess); 


        $target_directory= "../../archivos/actividades/";

        $target_file = $target_directory.basename($_FILES["file_matriz"]["name"]);   
        $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $nombrematrix= "Acti_matrix_".$id."_".$R->radowCadena(5).".".$filetype;
        $newfilename01 = $target_directory.$nombrematrix;

            // crongogramas
        $target_file02 = $target_directory.basename($_FILES["File_crono"]["name"]);  
        $filetype02 = strtolower(pathinfo($target_file02,PATHINFO_EXTENSION));
        $cronoNombre = "Acti_Crono_".$id."_".$R->radowCadena(5).".".$filetype02;
        $newfilename02 = $target_directory.$cronoNombre;
         // roles 
        $target_file03 = $target_directory.basename($_FILES["file_role"]["name"]);  
        $filetype03 = strtolower(pathinfo($target_file03,PATHINFO_EXTENSION));
        $Registroroles = "Acti_Roles_".$id."_".$R->radowCadena(5).".".$filetype03;
        $newfilename03 = $target_directory.$Registroroles;


        //empty($_FILES['file_acta']['name'])

         // ActaAperturaAudi
        $target_file04 = $target_directory.basename($_FILES["file_acta"]["name"]);  
        $filetype04 = strtolower(pathinfo($target_file04,PATHINFO_EXTENSION));
        $ActaAperturaAudi = "Acti_Acta_Apertura_".$id."_".$R->radowCadena(5).".".$filetype04;
        $newfilename04 = $target_directory.$ActaAperturaAudi;
        

        //nsolicitudAcceso
        $target_file05 = $target_directory.basename($_FILES["file_soli"]["name"]);  
        $filetype05 = strtolower(pathinfo($target_file05,PATHINFO_EXTENSION));
        $solicitudAcceso = "Acti_solici_Acceso_".$id."_".$R->radowCadena(5).".".$filetype05;
        $newfilename05 = $target_directory.$solicitudAcceso;

        if(move_uploaded_file($_FILES["file_matriz"]["tmp_name"],$newfilename01) and
            move_uploaded_file($_FILES["File_crono"]["tmp_name"],$newfilename02) and 
            move_uploaded_file($_FILES["file_role"]["tmp_name"],$newfilename03)  and
            move_uploaded_file($_FILES["file_acta"]["tmp_name"],$newfilename04) and  
            move_uploaded_file($_FILES["file_soli"]["tmp_name"],$newfilename05)
            ){

                $sql = "UPDATE  actividades SET fechaInicioActividad	='$fecha_inicio',
                    fechaFinActividad='$fecha_final' ,Cronograma ='$cronoNombre',matrizComparativa='$nombrematrix',
                    registroRoles='$Registroroles' , ActaAperturaAudi='$ActaAperturaAudi',solicitudAcceso ='$solicitudAcceso' WHERE id='$id'";   
                if($conexion->conexion->query($sql)){
                    echo 1;
            }
            else{
                echo 0;
            }

            }


        

}else if (empty($_FILES['file_conclusion']['name'])
   and empty($_FILES['file_ac_sierre']['name'])){

   unlink("../../archivos/actividades/".$matris);  
   unlink("../../archivos/actividades/".$Namecrono);  
   unlink("../../archivos/actividades/".$Nrole);  
   unlink("../../archivos/actividades/".$NActaAperturaAudi); 
   unlink("../../archivos/actividades/".$solictaccess); 
   unlink("../../archivos/actividades/".$NavanceHallasgos); 

   $target_directory= "../../archivos/actividades/";

   $target_file = $target_directory.basename($_FILES["file_matriz"]["name"]);   
   $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
   $nombrematrix= "Acti_matrix_".$id."_".$R->radowCadena(5).".".$filetype;
   $newfilename01 = $target_directory.$nombrematrix;

       // crongogramas
   $target_file02 = $target_directory.basename($_FILES["File_crono"]["name"]);  
   $filetype02 = strtolower(pathinfo($target_file02,PATHINFO_EXTENSION));
   $cronoNombre = "Acti_Crono_".$id."_".$R->radowCadena(5).".".$filetype02;
   $newfilename02 = $target_directory.$cronoNombre;
    // roles 
   $target_file03 = $target_directory.basename($_FILES["file_role"]["name"]);  
   $filetype03 = strtolower(pathinfo($target_file03,PATHINFO_EXTENSION));
   $Registroroles = "Acti_Roles_".$id."_".$R->radowCadena(5).".".$filetype03;
   $newfilename03 = $target_directory.$Registroroles;


   //empty($_FILES['file_acta']['name'])

    // ActaAperturaAudi
   $target_file04 = $target_directory.basename($_FILES["file_acta"]["name"]);  
   $filetype04 = strtolower(pathinfo($target_file04,PATHINFO_EXTENSION));
   $ActaAperturaAudi = "Acti_Acta_Apertura_".$id."_".$R->radowCadena(5).".".$filetype04;
   $newfilename04 = $target_directory.$ActaAperturaAudi;
   

   //nsolicitudAcceso
   $target_file05 = $target_directory.basename($_FILES["file_soli"]["name"]);  
   $filetype05 = strtolower(pathinfo($target_file05,PATHINFO_EXTENSION));
   $solicitudAcceso = "Acti_solici_Acceso_".$id."_".$R->radowCadena(5).".".$filetype05;
   $newfilename05 = $target_directory.$solicitudAcceso;

   //avanceHallasgos  avanceHallasgos
   $target_file06 = $target_directory.basename($_FILES["file_avanze"]["name"]);  
   $filetype06 = strtolower(pathinfo($target_file06,PATHINFO_EXTENSION));
   $avanceHallasgosd = "Acti_avanceHallasgos_".$id."_".$R->radowCadena(5).".".$filetype06;
   $newfilename06 = $target_directory.$avanceHallasgosd;

   if(move_uploaded_file($_FILES["file_matriz"]["tmp_name"],$newfilename01) and
       move_uploaded_file($_FILES["File_crono"]["tmp_name"],$newfilename02) and 
       move_uploaded_file($_FILES["file_role"]["tmp_name"],$newfilename03)  and
       move_uploaded_file($_FILES["file_acta"]["tmp_name"],$newfilename04) and  
       move_uploaded_file($_FILES["file_soli"]["tmp_name"],$newfilename05) and 
       move_uploaded_file($_FILES["file_avanze"]["tmp_name"],$newfilename06) 
     
       ){

        $sql = "UPDATE  actividades SET fechaInicioActividad='$fecha_inicio',
        fechaFinActividad='$fecha_final' ,Cronograma ='$cronoNombre',matrizComparativa='$nombrematrix',
        registroRoles='$Registroroles' , ActaAperturaAudi='$ActaAperturaAudi',solicitudAcceso ='$solicitudAcceso',avanceHallasgos ='$avanceHallasgosd' WHERE id='$id'";  
        if($conexion->conexion->query($sql)){
               echo 1;
       }
       else{
           echo 0;
       }

       }


   

}else if (
       empty($_FILES['file_ac_sierre']['name'])){

unlink("../../archivos/actividades/".$matris);  
unlink("../../archivos/actividades/".$Namecrono);  
unlink("../../archivos/actividades/".$Nrole);  
unlink("../../archivos/actividades/".$NActaAperturaAudi); 
unlink("../../archivos/actividades/".$solictaccess); 
unlink("../../archivos/actividades/".$NavanceHallasgos); 
unlink("../../archivos/actividades/".$NconclusionAudi); 
$target_directory= "../../archivos/actividades/";

$target_file = $target_directory.basename($_FILES["file_matriz"]["name"]);   
$filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$nombrematrix= "Acti_matrix_".$id."_".$R->radowCadena(5).".".$filetype;
$newfilename01 = $target_directory.$nombrematrix;

    // crongogramas
$target_file02 = $target_directory.basename($_FILES["File_crono"]["name"]);  
$filetype02 = strtolower(pathinfo($target_file02,PATHINFO_EXTENSION));
$cronoNombre = "Acti_Crono_".$id."_".$R->radowCadena(5).".".$filetype02;
$newfilename02 = $target_directory.$cronoNombre;
 // roles 
$target_file03 = $target_directory.basename($_FILES["file_role"]["name"]);  
$filetype03 = strtolower(pathinfo($target_file03,PATHINFO_EXTENSION));
$Registroroles = "Acti_Roles_".$id."_".$R->radowCadena(5).".".$filetype03;
$newfilename03 = $target_directory.$Registroroles;


//empty($_FILES['file_acta']['name'])

 // ActaAperturaAudi
$target_file04 = $target_directory.basename($_FILES["file_acta"]["name"]);  
$filetype04 = strtolower(pathinfo($target_file04,PATHINFO_EXTENSION));
$ActaAperturaAudi = "Acti_Acta_Apertura_".$id."_".$R->radowCadena(5).".".$filetype04;
$newfilename04 = $target_directory.$ActaAperturaAudi;


//nsolicitudAcceso
$target_file05 = $target_directory.basename($_FILES["file_soli"]["name"]);  
$filetype05 = strtolower(pathinfo($target_file05,PATHINFO_EXTENSION));
$solicitudAcceso = "Acti_solici_Acceso_".$id."_".$R->radowCadena(5).".".$filetype05;
$newfilename05 = $target_directory.$solicitudAcceso;

//avanceHallasgos  avanceHallasgos
$target_file06 = $target_directory.basename($_FILES["file_avanze"]["name"]);  
$filetype06 = strtolower(pathinfo($target_file06,PATHINFO_EXTENSION));
$avanceHallasgosd = "Acti_avanceHallasgos_".$id."_".$R->radowCadena(5).".".$filetype06;
$newfilename06 = $target_directory.$avanceHallasgosd;



//file_conclusion

 //conclusionAudi  conclusionAudi
 $target_file07 = $target_directory.basename($_FILES["file_conclusion"]["name"]);  
 $filetype07 = strtolower(pathinfo($target_file07,PATHINFO_EXTENSION));
 $cc = "Acti_conclusionAudi_".$id."_".$R->radowCadena(5).".".$filetype07;
 $newfilename07 = $target_directory.$cc;



if( move_uploaded_file($_FILES["file_matriz"]["tmp_name"],$newfilename01) and
    move_uploaded_file($_FILES["File_crono"]["tmp_name"],$newfilename02) and 
    move_uploaded_file($_FILES["file_role"]["tmp_name"],$newfilename03)  and
    move_uploaded_file($_FILES["file_acta"]["tmp_name"],$newfilename04) and  
    move_uploaded_file($_FILES["file_soli"]["tmp_name"],$newfilename05) and 
    move_uploaded_file($_FILES["file_avanze"]["tmp_name"],$newfilename06) and 
    move_uploaded_file($_FILES["file_conclusion"]["tmp_name"],$newfilename07)
    ){
     
        $sql = "UPDATE  actividades SET fechaInicioActividad='$fecha_inicio',
        fechaFinActividad='$fecha_final',conclusionAudi='$cc',Cronograma ='$cronoNombre',matrizComparativa='$nombrematrix',
        registroRoles='$Registroroles' , ActaAperturaAudi='$ActaAperturaAudi',solicitudAcceso ='$solicitudAcceso',avanceHallasgos ='$avanceHallasgosd' WHERE id='$id'";  
        if($conexion->conexion->query($sql)){
               echo 1;
       }
       else{
           echo 0;
       }

    }




}else{
    
unlink("../../archivos/actividades/".$matris);  
unlink("../../archivos/actividades/".$Namecrono);  
unlink("../../archivos/actividades/".$Nrole);  
unlink("../../archivos/actividades/".$NActaAperturaAudi); 
unlink("../../archivos/actividades/".$solictaccess); 
unlink("../../archivos/actividades/".$NavanceHallasgos); 
unlink("../../archivos/actividades/".$NconclusionAudi);
unlink("../../archivos/actividades/".$NactaCierre);

$target_directory= "../../archivos/actividades/";

$target_file = $target_directory.basename($_FILES["file_matriz"]["name"]);   
$filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$nombrematrix= "Acti_matrix_".$id."_".$R->radowCadena(5).".".$filetype;
$newfilename01 = $target_directory.$nombrematrix;

    // crongogramas
$target_file02 = $target_directory.basename($_FILES["File_crono"]["name"]);  
$filetype02 = strtolower(pathinfo($target_file02,PATHINFO_EXTENSION));
$cronoNombre = "Acti_Crono_".$id."_".$R->radowCadena(5).".".$filetype02;
$newfilename02 = $target_directory.$cronoNombre;
 // roles 
$target_file03 = $target_directory.basename($_FILES["file_role"]["name"]);  
$filetype03 = strtolower(pathinfo($target_file03,PATHINFO_EXTENSION));
$Registroroles = "Acti_Roles_".$id."_".$R->radowCadena(5).".".$filetype03;
$newfilename03 = $target_directory.$Registroroles;


//empty($_FILES['file_acta']['name'])

 // ActaAperturaAudi
$target_file04 = $target_directory.basename($_FILES["file_acta"]["name"]);  
$filetype04 = strtolower(pathinfo($target_file04,PATHINFO_EXTENSION));
$ActaAperturaAudi = "Acti_Acta_Apertura_".$id."_".$R->radowCadena(5).".".$filetype04;
$newfilename04 = $target_directory.$ActaAperturaAudi;


//nsolicitudAcceso
$target_file05 = $target_directory.basename($_FILES["file_soli"]["name"]);  
$filetype05 = strtolower(pathinfo($target_file05,PATHINFO_EXTENSION));
$solicitudAcceso = "Acti_solici_Acceso_".$id."_".$R->radowCadena(5).".".$filetype05;
$newfilename05 = $target_directory.$solicitudAcceso;

//avanceHallasgos  avanceHallasgos
$target_file06 = $target_directory.basename($_FILES["file_avanze"]["name"]);  
$filetype06 = strtolower(pathinfo($target_file06,PATHINFO_EXTENSION));
$avanceHallasgosd = "Acti_avanceHallasgos_".$id."_".$R->radowCadena(5).".".$filetype06;
$newfilename06 = $target_directory.$avanceHallasgosd;



//file_conclusion

 //conclusionAudi  conclusionAudi
 $target_file07 = $target_directory.basename($_FILES["file_conclusion"]["name"]);  
 $filetype07 = strtolower(pathinfo($target_file07,PATHINFO_EXTENSION));
 $cc = "Acti_conclusionAudi_".$id."_".$R->radowCadena(5).".".$filetype07;
 $newfilename07 = $target_directory.$cc;

  //actaCierre

  $target_file08 = $target_directory.basename($_FILES["file_ac_sierre"]["name"]);  
  $filetype08 = strtolower(pathinfo($target_file08,PATHINFO_EXTENSION));
  $actaCierrey = "Acti_actaCierre_".$id."_".$R->radowCadena(5).".".$filetype08;
  $newfilename08 = $target_directory.$actaCierrey;



if( move_uploaded_file($_FILES["file_matriz"]["tmp_name"],$newfilename01) and
    move_uploaded_file($_FILES["File_crono"]["tmp_name"],$newfilename02) and 
    move_uploaded_file($_FILES["file_role"]["tmp_name"],$newfilename03)  and
    move_uploaded_file($_FILES["file_acta"]["tmp_name"],$newfilename04) and  
    move_uploaded_file($_FILES["file_soli"]["tmp_name"],$newfilename05) and 
    move_uploaded_file($_FILES["file_avanze"]["tmp_name"],$newfilename06) and 
    move_uploaded_file($_FILES["file_conclusion"]["tmp_name"],$newfilename07)and
    move_uploaded_file($_FILES["file_ac_sierre"]["tmp_name"],$newfilename08)

    ){
     
        $sql = "UPDATE  actividades SET fechaInicioActividad='$fecha_inicio',
        fechaFinActividad='$fecha_final',conclusionAudi='$cc',Cronograma ='$cronoNombre',matrizComparativa='$nombrematrix',
        registroRoles='$Registroroles',actaCierre ='$actaCierrey' , ActaAperturaAudi='$ActaAperturaAudi',solicitudAcceso ='$solicitudAcceso',avanceHallasgos ='$avanceHallasgosd' WHERE id='$id'";  
        if($conexion->conexion->query($sql)){
               echo 1;
       }
       else{
           echo 0;
       }

    }






}





?>