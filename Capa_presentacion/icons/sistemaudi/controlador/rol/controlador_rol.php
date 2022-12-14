<?php
    require '../../modelo/roles.php';
    $MU = new Role();
    $consulta = $MU->listar_rol();
    echo json_encode($consulta);
?>