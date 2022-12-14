<?php
    require '../../modelo/modelo_plan.php';
    $MU = new Plan();
    $consulta = $MU->listar_combo_Empresa();
    echo json_encode($consulta);
?>