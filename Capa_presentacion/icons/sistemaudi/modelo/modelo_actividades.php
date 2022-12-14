<?php
class Actividades{
    private $conexion;
    function __construct (){
        require_once 'modelo_conexion.php';
        $this->conexion = new conexion();
        $this->conexion->conectar();
    }

  function Registrar_Plan($id_empresa,$fechaInicioActividad,$fechaFinActividad,$Cronograma,
   $matrizComparativa,$registroRoles,$ActaAperturaAudi,$solicitudAcceso,$avanceHallasgos,$conclusionAudi,
   $actaCierre){
        $sql = "call Set_Registro_Actividades('$id_empresa','$fechaInicioActividad','$fechaFinActividad','$Cronograma', '$matrizComparativa','$registroRoles','$ActaAperturaAudi','$solicitudAcceso','$avanceHallasgos',
        '$conclusionAudi','$actaCierre')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            if ($row = mysqli_fetch_array($consulta)) {
                    return $id= trim($row[0]);
            }
            $this->conexion->cerrar();
        }
  }
  
  public function eliminar($id){
    $sql= "DELETE from actividades where id='$id'";
  
    if($this->conexion->conexion->query($sql)){
        return 1;
   }
   else{
       return 0;
   }
  }
  
  public function actulizar($id,$fecha_inicio,$fecha_final,$nombrematrix){
   
    $sql ="UPDATE  actividades SET fechaInicioActividad	='$fecha_inicio',
    	fechaFinActividad='$fecha_final' , matrizComparativa='$nombrematrix' WHERE id='$id'";   
    if($this->conexion->conexion->query($sql)){
        return 1;
   }
   else{
       return 0;
   }
  }



    public function listar_Actividades(){
        $sql = "call listar_actividades()";
        $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
    }


    function listar_combo_Empresa(){
        $sql = "call listar_empresa()";
        $arreglo = array();
        if ($consulta = $this->conexion->conexion->query($sql)) {
            while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    $arreglo[] = $consulta_VU;
            }
            return $arreglo;
            $this->conexion->cerrar();
        }
    }

}



?>
