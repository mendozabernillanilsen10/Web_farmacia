<?php
    require '../../modelo/revision.php';
    $MU = new Revision();
    $id   = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $consulta = $MU->eliminar($id);
    echo $consulta;

?>