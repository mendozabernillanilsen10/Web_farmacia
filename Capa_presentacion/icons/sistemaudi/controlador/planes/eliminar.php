<?php
      require '../../modelo/modelo_plan.php';
      $MU = new plan ();
      $id=htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
      $id_empresa = htmlspecialchars($_POST['idempresa'],ENT_QUOTES,'UTF-8');

      $respuesta =$MU->eliminar($id,$id_empresa);
      echo $respuesta;

?>