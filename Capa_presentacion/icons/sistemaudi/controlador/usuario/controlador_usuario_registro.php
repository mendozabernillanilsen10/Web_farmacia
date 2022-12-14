<?php
    require '../../modelo/modelo_usuario.php';

    $MU = new Modelo_Usuario();
    $usuario = htmlspecialchars($_POST['usuario'],ENT_QUOTES,'UTF-8');
    $contra = password_hash ($_POST['contrasena'],PASSWORD_DEFAULT,['cost'=>10]);
    $rol = htmlspecialchars($_POST['rol'],ENT_QUOTES,'UTF-8');
    $nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
    $apellido =htmlspecialchars($_POST['apellido'],ENT_QUOTES,'UTF-8');

    $consulta = $MU->Registrar_Usuario($usuario,$contra,$rol,$nombre,$apellido);
    echo $consulta;

?>