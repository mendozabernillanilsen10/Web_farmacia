<?php
    require '../../modelo/modelo_empresa.php';

    $MU = new Modelo_Empresa();



    $razonSocial = htmlspecialchars($_POST['txt_Razon_social'],ENT_QUOTES,'UTF-8');
    $ruc = htmlspecialchars($_POST['txt_Ruc'],ENT_QUOTES,'UTF-8');
    $direccion = htmlspecialchars($_POST['txt_Direccion'],ENT_QUOTES,'UTF-8');
    $telefono = htmlspecialchars($_POST['txt_telefono'],ENT_QUOTES,'UTF-8');
    $email = htmlspecialchars($_POST['txt_email'],ENT_QUOTES,'UTF-8');
    $gerente = htmlspecialchars($_POST['txt_gerente'],ENT_QUOTES,'UTF-8');
   

    $filename = $ruc.".jpg";
    $target_directory = "../../archivos/empresa/";
         // $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
         //$newfilename = $target_directory.$filename.".".$filetype;
    $newfilename = $target_directory.$filename;
        /// move_uploaded_file($_FILES["file"]["tmp_name"],$newfilename);   // tmp_name is the file temprory stored in the server
  
       //Now to check if uploaded or not
  
    if(move_uploaded_file($_FILES["file"]["tmp_name"],$newfilename)) {
        $consulta = $MU->Registrar_Empresa($razonSocial , $ruc,$direccion, $telefono, $email, $gerente , $filename);
        echo $consulta;
    }else{
       echo 0;
    }


   
   
   
   
    
 



  

?>