<?php

    require '../../modelo/modelo_actividades.php';
    require '../../modelo/randow.php';
    $MU = new Actividades();
    $R= new randow();
    
    $id_empresa = htmlspecialchars($_POST['id_empresa'],ENT_QUOTES,'UTF-8');
    $fecha_inicio = htmlspecialchars(trim(date('Y-m-d', strtotime($_POST['fechaInicioActividad']))),ENT_QUOTES,'UTF-8');
    $fecha_final = htmlspecialchars(trim(date('Y-m-d', strtotime($_POST['fechaFinActividad']))),ENT_QUOTES,'UTF-8');
    
    //direccirio
    $target_directory = "../../archivos/actividades/";
   
    // resiviendo crongogramas
    $target_file = $target_directory.basename($_FILES["matriz"]["name"]);   
    $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $nombrematrix= "Acti_matrix_".$id_empresa."_".$R->radowCadena(5).".".$filetype;
    $newfilename01 = $target_directory.$nombrematrix;

    // crongogramas
    $target_file02 = $target_directory.basename($_FILES["crono"]["name"]);  
    $filetype02 = strtolower(pathinfo($target_file02,PATHINFO_EXTENSION));
    $cronoNombre = "Acti_Crono_".$id_empresa."_".$R->radowCadena(5).".".$filetype02;
    $newfilename02 = $target_directory.$cronoNombre;

    // roles 
    $target_file03 = $target_directory.basename($_FILES["registroR"]["name"]);  
    $filetype03 = strtolower(pathinfo($target_file03,PATHINFO_EXTENSION));
    $Registroroles = "Acti_Roles_".$id_empresa."_".$R->radowCadena(5).".".$filetype03;
    $newfilename03 = $target_directory.$Registroroles;

    // ActaAperturaAudi
    $target_file04 = $target_directory.basename($_FILES["ActaAperturaAudi"]["name"]);  
    $filetype04 = strtolower(pathinfo($target_file04,PATHINFO_EXTENSION));
    $ActaAperturaAudi = "Acti_Acta_Apertura_".$id_empresa."_".$R->radowCadena(5).".".$filetype04;
    $newfilename04 = $target_directory.$ActaAperturaAudi;

    //nsolicitudAcceso
    $target_file05 = $target_directory.basename($_FILES["solicitudAcceso"]["name"]);  
    $filetype05 = strtolower(pathinfo($target_file05,PATHINFO_EXTENSION));
    $solicitudAcceso = "Acti_solici_Acceso_".$id_empresa."_".$R->radowCadena(5).".".$filetype05;
    $newfilename05 = $target_directory.$solicitudAcceso;

    //avanceHallasgos  avanceHallasgos
    $target_file06 = $target_directory.basename($_FILES["avanceHallasgos"]["name"]);  
    $filetype06 = strtolower(pathinfo($target_file06,PATHINFO_EXTENSION));
    $avanceHallasgos = "Acti_avanceHallasgos_".$id_empresa."_".$R->radowCadena(5).".".$filetype06;
    $newfilename06 = $target_directory.$avanceHallasgos;


    //conclusionAudi  conclusionAudi
      $target_file07 = $target_directory.basename($_FILES["conclusionAudi"]["name"]);  
      $filetype07 = strtolower(pathinfo($target_file07,PATHINFO_EXTENSION));
      $conclusionAudi = "Acti_conclusionAudi_".$id_empresa."_".$R->radowCadena(5).".".$filetype07;
      $newfilename07 = $target_directory.$conclusionAudi;

    //actaCierre

      $target_file08 = $target_directory.basename($_FILES["actaCierre"]["name"]);  
      $filetype08 = strtolower(pathinfo($target_file08,PATHINFO_EXTENSION));
      $actaCierre = "Acti_actaCierre_".$id_empresa."_".$R->radowCadena(5).".".$filetype08;
      $newfilename08 = $target_directory.$actaCierre;



  if(move_uploaded_file($_FILES["matriz"]["tmp_name"],$newfilename01)
    and move_uploaded_file($_FILES["crono"]["tmp_name"],$newfilename02)
    and move_uploaded_file($_FILES["registroR"]["tmp_name"],$newfilename03)
    and move_uploaded_file($_FILES["ActaAperturaAudi"]["tmp_name"],$newfilename04)
    and move_uploaded_file($_FILES["solicitudAcceso"]["tmp_name"],$newfilename05)
    and move_uploaded_file($_FILES["avanceHallasgos"]["tmp_name"],$newfilename06)
    and move_uploaded_file($_FILES["conclusionAudi"]["tmp_name"],$newfilename07)
    and move_uploaded_file($_FILES["actaCierre"]["tmp_name"],$newfilename08)) {
     

      $consulta = $MU->Registrar_Plan($id_empresa,$fecha_inicio,$fecha_final,
      $cronoNombre,
      $nombrematrix,
      $Registroroles,
      $ActaAperturaAudi,
      $solicitudAcceso,
      $avanceHallasgos,
      $conclusionAudi,
      $actaCierre);
      echo $consulta;

    }else{
       echo 0;
    }

    
    
?>


  

