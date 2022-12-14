

<?php   
require '../../modelo/modelo_usuario.php';
$MU = new Modelo_Usuario();

$id_usuario = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$usuario = htmlspecialchars($_POST['usuario'],ENT_QUOTES,'UTF-8');
$rol = htmlspecialchars($_POST['rol'],ENT_QUOTES,'UTF-8');
$nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
$apellido =htmlspecialchars($_POST['apellido'],ENT_QUOTES,'UTF-8');
$consulta = $MU->ModificarDatos_Usuario($id_usuario,$usuario,$rol,$nombre,$apellido);


echo $consulta;





?>