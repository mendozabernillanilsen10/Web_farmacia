<?php
    require '../../modelo/Modelo_check.php';
    $MU = new Chek();
    $id   = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    
    $target_directory = "../../archivos/modeloCheck/";

    $target_file = $target_directory.basename($_FILES["Result"]["name"]);   
    $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $nombreAlcanzable= "Documentos_result".$id.".".$filetype;
    $newfilename = $target_directory.$nombreAlcanzable;

    $target_file1 = $target_directory.basename($_FILES["Result"]["name"]);   
    $filetype1 = strtolower(pathinfo($target_file1,PATHINFO_EXTENSION));
    $nombreAlcanzable1= "Documentos_info".$id.".".$filetype1;
    $newfilename1 = $target_directory.$nombreAlcanzable1;
    

    if(move_uploaded_file($_FILES["Result"]["tmp_name"],$newfilename) and 
        move_uploaded_file($_FILES["informe"]["tmp_name"],$newfilename1)) {
        $consulta = $MU->Registrar( $nombreAlcanzable,  $nombreAlcanzable1 ,$id);
        echo $consulta;
    }else{
       echo 0;
    }
?>