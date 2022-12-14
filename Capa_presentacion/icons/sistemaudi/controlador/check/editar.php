<?php
    require '../../modelo/Modelo_check.php';
    $MU = new Chek();
    $id   = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $nombreresul   = htmlspecialchars($_POST['nombreresul'],ENT_QUOTES,'UTF-8');
    $nombreFinal   = htmlspecialchars($_POST['nombreFinal'],ENT_QUOTES,'UTF-8');
    $id_empresa	= htmlspecialchars($_POST['id_empresa'],ENT_QUOTES,'UTF-8');
  

    if(empty($_FILES['fileResultado']['name'])){

        unlink("../../archivos/modeloCheck/".$nombreFinal);   
        $target_directory = "../../archivos/modeloCheck/";
       
        $target_file1 = $target_directory.basename($_FILES["edithInforme"]["name"]);   
        $filetype1 = strtolower(pathinfo($target_file1,PATHINFO_EXTENSION));
        $nombreAlcanzable1= "Documentos_info".$id_empresa.".".$filetype1;
        $newfilename1 = $target_directory.$nombreAlcanzable1;
        
        if(move_uploaded_file($_FILES["edithInforme"]["tmp_name"],$newfilename1) ){
            $resultado =  $MU->updateDatosv1($id, $nombreAlcanzable1);
            echo $resultado;

        }
    }else if(empty($_FILES['edithInforme']['name'])){

        unlink("../../archivos/modeloCheck/".$nombreresul );
        $target_directory = "../../archivos/modeloCheck/";
        $target_file = $target_directory.basename($_FILES["fileResultado"]["name"]);   
        $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $nombreAlcanzable= "Documentos_result".$id_empresa.".".$filetype;
        $newfilename = $target_directory.$nombreAlcanzable;

        if(move_uploaded_file($_FILES["fileResultado"]["tmp_name"],$newfilename) ){
            $resultado =  $MU->updateDatosv2($id, $nombreAlcanzable);
            echo $resultado;

        }
    }else{
        unlink("../../archivos/modeloCheck/".$nombreFinal);   
        $target_directory = "../../archivos/modeloCheck/";
       
        $target_file1 = $target_directory.basename($_FILES["edithInforme"]["name"]);   
        $filetype1 = strtolower(pathinfo($target_file1,PATHINFO_EXTENSION));
        $nombreAlcanzable1= "Documentos_info".$id_empresa.".".$filetype1;
        $newfilename1 = $target_directory.$nombreAlcanzable1;
        
        unlink("../../archivos/modeloCheck/".$nombreresul );
       
        $target_file = $target_directory.basename($_FILES["fileResultado"]["name"]);   
        $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $nombreAlcanzable= "Documentos_result".$id_empresa.".".$filetype;
        $newfilename = $target_directory.$nombreAlcanzable;

        if(move_uploaded_file($_FILES["fileResultado"]["tmp_name"],$newfilename) and 
           move_uploaded_file($_FILES["edithInforme"]["tmp_name"],$newfilename1)
         ){
            $resultado =  $MU->updateDatosv3($id, $nombreAlcanzable, $nombreAlcanzable1);
            echo $resultado;

        }
    }



?>