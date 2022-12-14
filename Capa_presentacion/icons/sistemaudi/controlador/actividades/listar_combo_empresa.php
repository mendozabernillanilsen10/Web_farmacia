<?php
    require '../../modelo/modelo_actividades.php';
    $MU = new Actividades();
    
    $consulta = $MU->listar_combo_Empresa();
    echo json_encode($consulta);
?>