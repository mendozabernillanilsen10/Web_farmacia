<?php
    require '../../modelo/Modelo_check.php';
    $MU = new Chek();
    $consulta = $MU->listar();
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