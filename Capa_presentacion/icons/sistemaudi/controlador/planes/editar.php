<?php
      require '../../modelo/modelo_plan.php';
      require '../../modelo/randow.php';
      $MU = new plan ();
      $R= new randow();
      $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
      $fecha_inicio = htmlspecialchars(trim(date('Y-m-d', strtotime($_POST['edith_fecha_audi']))),ENT_QUOTES,'UTF-8');
      $fecha_final = htmlspecialchars(trim(date('Y-m-d', strtotime($_POST['edith_fecha_final']))),ENT_QUOTES,'UTF-8');
      $cronograma = htmlspecialchars($_POST['edith_Nombre_cronograma'],ENT_QUOTES,'UTF-8');
      $dock_alcanze = htmlspecialchars($_POST['edith_Nombre_Alca'],ENT_QUOTES,'UTF-8');

      if(empty($_FILES['file_crono']['name']) and empty($_FILES['file_alcan']['name'])){
         $resultado =  $MU->updateDatosv1($id,$fecha_inicio,$fecha_final);
         echo $resultado;
      }else if(empty($_FILES['file_crono']['name'])){
        unlink("../../archivos/plan/".$dock_alcanze);   
        $target_directory = "../../archivos/plan/";
        // resiviendo crongogramas
        $target_file = $target_directory.basename($_FILES["file_alcan"]["name"]);   
        $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $nombreAlcanzable= "Planes_Alcanzable_".$id.".".$filetype;
        $newfilename02 = $target_directory.$nombreAlcanzable;
        if(move_uploaded_file($_FILES["file_alcan"]["tmp_name"],$newfilename02) ){
        $resultado =  $MU->updateDatosv2($id,$fecha_inicio,$fecha_final,$nombreAlcanzable);
        echo $resultado;
        }
        
     }else if(empty($_FILES['file_alcan']['name'])){
     
        unlink("../../archivos/plan/".$cronograma);   
        $target_directory = "../../archivos/plan/";
        $target_file1 = $target_directory.basename($_FILES["file_crono"]["name"]);   
        $filetype1 = strtolower(pathinfo($target_file1,PATHINFO_EXTENSION));
        $filenameCronograma= "Planes_Cronograma_".$id.".".$filetype1;
        $newfilename = $target_directory.$filenameCronograma;
        if(move_uploaded_file($_FILES["file_crono"]["tmp_name"],$newfilename) ){
        $resultado =  $MU->updateDatosv3($id,$fecha_inicio,$fecha_final,$filenameCronograma);
        echo $resultado;
        }
     }else {
      unlink("../../archivos/plan/".$dock_alcanze);   
      $target_directory = "../../archivos/plan/";
      // resiviendo crongogramas
      $target_file = $target_directory.basename($_FILES["file_alcan"]["name"]);   
      $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
      $nombreAlcanzable= "Planes_Alcanzable_".$id.".".$filetype;
      $newfilename02 = $target_directory.$nombreAlcanzable;
      ///
      unlink("../../archivos/plan/".$cronograma);   
      $target_file1 = $target_directory.basename($_FILES["file_crono"]["name"]);   
      $filetype1 = strtolower(pathinfo($target_file1,PATHINFO_EXTENSION));
      $filenameCronograma= "Planes_Cronograma_".$id.".".$filetype1;
      $newfilename = $target_directory.$filenameCronograma;

      if(move_uploaded_file($_FILES["file_crono"]["tmp_name"],$newfilename)
         and move_uploaded_file($_FILES["file_alcan"]["tmp_name"],$newfilename02) ){
     

        $resultado =  $MU->updateDatosv4($id,$fecha_inicio,$fecha_final,$filenameCronograma,$nombreAlcanzable);
        echo $resultado;

      }
   }

     
      
     

     
 ?>