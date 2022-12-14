
<?php 

    require '../../modelo/modelo_empresa.php';
    $MU = new Modelo_Empresa();

    $id_empresa = htmlspecialchars($_POST['edit_idEmpresa'],ENT_QUOTES,'UTF-8');
    $edith_Razon_social= htmlspecialchars($_POST['edith_Razon_social'],ENT_QUOTES,'UTF-8');
    $edtihRuc = htmlspecialchars($_POST['edtihRuc'],ENT_QUOTES,'UTF-8');
    $edith_direc = htmlspecialchars($_POST['edith_direc'],ENT_QUOTES,'UTF-8');
    $edith_telefone= htmlspecialchars($_POST['edith_telefone'],ENT_QUOTES,'UTF-8');
    $edtih_email= htmlspecialchars($_POST['edtih_email'],ENT_QUOTES,'UTF-8');
    $edith_gerente= htmlspecialchars($_POST['edith_gerente'],ENT_QUOTES,'UTF-8');
    $NombreLogo= htmlspecialchars($_POST['NombreLogo'],ENT_QUOTES,'UTF-8');

    if(empty($_FILES['foto']['name'])){
        $consulta = $MU->Update_empresaV1($id_empresa ,$edith_Razon_social
        ,$edtihRuc,$edith_direc , $edith_telefone,$edtih_email,$edith_gerente);
        echo $consulta;  
    }else{
        unlink("../../archivos/empresa/".$NombreLogo);   
        $target_directory = "../../archivos/empresa/";
        $newfilename = $target_directory.$NombreLogo;
        if(move_uploaded_file($_FILES["foto"]["tmp_name"],$newfilename)){
            $consulta = $MU->Update_empresaV2($id_empresa ,$edith_Razon_social
            ,$edtihRuc ,$edith_direc, $edith_telefone,$edtih_email,$edith_gerente,$NombreLogo);
            echo $consulta;
        }
    
    }

    
  

    

    
?>