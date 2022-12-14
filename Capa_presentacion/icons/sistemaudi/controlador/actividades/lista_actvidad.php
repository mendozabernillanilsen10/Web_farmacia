<?php
    require '../../modelo/modelo_actividades.php';
    $MU = new Actividades();
    $consulta = $MU->listar_Actividades();
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
		    "sEcho": 1,
		    "iTotalRecords": "0",
		    "iTotalDisplayRecords": "0",
		    "aaData": []
		}';
    }

?>