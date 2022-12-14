<?php
    require '../../modelo/modelo_empresa.php';
    $MU = new Modelo_Empresa();
    $consulta = $MU->listar_Empresa();
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