<?php
      require '../../modelo/modelo_plan.php';
      $MU = new plan ();
    
    $fecha_inicio = htmlspecialchars(trim(date('Y-m-d', strtotime($_POST['fecha_audi']))),ENT_QUOTES,'UTF-8');
    $fecha_final = htmlspecialchars(trim(date('Y-m-d', strtotime($_POST['fecha_final']))),ENT_QUOTES,'UTF-8');
    $id_empresa = htmlspecialchars($_POST['cbm_empresa'],ENT_QUOTES,'UTF-8');
    $target_directory = "../../archivos/plan/";

    $target_file1 = $target_directory.basename($_FILES["cronograma"]["name"]);   
    $filetype1 = strtolower(pathinfo($target_file1,PATHINFO_EXTENSION));
    $filenameCronograma= "Planes_Cronograma_".$id_empresa.".".$filetype1;
    $newfilename = $target_directory.$filenameCronograma;
    
    $target_file = $target_directory.basename($_FILES["documentoAlcanze"]["name"]);   
    $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $nombreAlcanzable= "Planes_Alcanzable_".$id_empresa.".".$filetype;
    $newfilename02 = $target_directory.$nombreAlcanzable;
  
    if(move_uploaded_file($_FILES["cronograma"]["tmp_name"],$newfilename) and 
        move_uploaded_file($_FILES["documentoAlcanze"]["tmp_name"],$newfilename02)) {
        $consulta = $MU->Registrar_Plan($fecha_inicio ,$fecha_final, $id_empresa, $filenameCronograma,$nombreAlcanzable);
        echo $consulta;
    }else{
       echo 0;
    }

    ?>
