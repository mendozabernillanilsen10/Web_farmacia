<?php
    require '../../modelo/revision.php';
    $MU = new Revision();

    $observa  = htmlspecialchars($_POST['observacion'],ENT_QUOTES,'UTF-8');
    $prpuesta = htmlspecialchars($_POST['mejora'],ENT_QUOTES,'UTF-8');
    $id_em    = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    



    $consulta = $MU->Registrar_mejoraa($observa,$prpuesta,$id_em);
    echo $consulta;

?>