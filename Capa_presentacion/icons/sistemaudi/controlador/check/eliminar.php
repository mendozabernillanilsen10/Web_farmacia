<?php
    require '../../modelo/Modelo_check.php';
    $MU = new Chek();
    $id   = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    

    $consulta = $MU->eliminar($id);
    echo $consulta;
?>