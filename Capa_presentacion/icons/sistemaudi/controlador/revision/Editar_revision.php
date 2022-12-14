<?php
    require '../../modelo/revision.php';
    $MU = new Revision();

    $observa  = htmlspecialchars($_POST['observasion'],ENT_QUOTES,'UTF-8');
    $prpuesta = htmlspecialchars($_POST['mejoraPro'],ENT_QUOTES,'UTF-8');
    $id   = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    
    $consulta = $MU->Editar_data($id,$prpuesta,$observa);
    echo $consulta;

?>