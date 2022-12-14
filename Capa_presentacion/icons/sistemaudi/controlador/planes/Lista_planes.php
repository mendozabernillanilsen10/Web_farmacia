<?php
    require '../../modelo/modelo_plan.php';
    $MU = new plan ();
    $consulta = $MU->listar_planes();
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