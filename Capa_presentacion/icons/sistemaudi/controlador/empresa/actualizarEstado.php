<?php
    require '../../modelo/modelo_empresa.php';
    $MU = new Modelo_Empresa();

    $id_empresa = htmlspecialchars($_POST['edit_idEmpresa'],ENT_QUOTES,'UTF-8');
    $es = htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8');
    $consulta = $MU->editarEstado($id_empresa ,$es );
    echo $consulta;

?>