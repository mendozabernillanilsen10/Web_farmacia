<?php
    require '../../modelo/modelo_actividades.php';
    $MU = new Actividades();

    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $Cronograma =htmlspecialchars($_POST['Cronograma'],ENT_QUOTES,'UTF-8');
    $matrizComparativa = htmlspecialchars($_POST['matrizComparativa'],ENT_QUOTES,'UTF-8');
    $registroRoles = htmlspecialchars($_POST['registroRoles'],ENT_QUOTES,'UTF-8');
    $ActaAperturaAudi = htmlspecialchars($_POST['ActaAperturaAudi'],ENT_QUOTES,'UTF-8');
    $solicitudAcceso = htmlspecialchars($_POST['solicitudAcceso'],ENT_QUOTES,'UTF-8');
    $avanceHallasgos = htmlspecialchars($_POST['avanceHallasgos'],ENT_QUOTES,'UTF-8');
    $conclusionAudi = htmlspecialchars($_POST['conclusionAudi'],ENT_QUOTES,'UTF-8');
    $actaCierre = htmlspecialchars($_POST['actaCierre'],ENT_QUOTES,'UTF-8');
    unlink("../../archivos/actividades/".$Cronograma);
    unlink("../../archivos/actividades/".$matrizComparativa);
    unlink("../../archivos/actividades/".$registroRoles );
    unlink("../../archivos/actividades/".$ActaAperturaAudi);
    unlink("../../archivos/actividades/".$solicitudAcceso);
    unlink("../../archivos/actividades/".$avanceHallasgos);
    unlink("../../archivos/actividades/".$conclusionAudi);
    unlink("../../archivos/actividades/".$actaCierre);
    $resultado =  $MU->eliminar($id);
    echo  $resultado ;

?>