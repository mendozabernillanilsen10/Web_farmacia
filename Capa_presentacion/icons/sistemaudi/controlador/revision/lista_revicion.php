<?php
    require '../../modelo/revision.php';
    $MU = new Revision();
    $consulta = $MU->listar_listarRevision();
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