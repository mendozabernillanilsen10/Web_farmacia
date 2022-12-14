<?php
class Chek {
    private $conexion;
    function __construct (){
        require_once 'modelo_conexion.php';
        $this->conexion = new conexion();
        $this->conexion->conectar();
    }

  

    function Registrar( $nombreAlcanzable,  $nombreAlcanzable1 ,$id ){
        $sql = "call set_registroverificacion_check('$nombreAlcanzable','$nombreAlcanzable1','$id')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            if ($row = mysqli_fetch_array($consulta)) {
                    return $id= trim($row[0]);
            }
            $this->conexion->cerrar();
        }
    }


    public function listar(){
        $sql = "call listar_verificacion_Check()";
        $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
    }


    public function Editar($id,$prpuesta,$observa){
        $sql = "call Set_modificar_datos_Revision('$id','$prpuesta' , '$observa')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            return 1;
            
        }else{
            return 0;
        }
    }
    public function eliminar($id){
        $sql = "call update_eliminar_verificacacion_check('$id')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            return 1;
            
        }else{
            return 0;
        }
    }

    public function updateDatosv1($id, $nombreAlcanzable1){
        $sql ="UPDATE  verificacacion_check SET informafinal='$nombreAlcanzable1' WHERE id='$id'";
        if($this->conexion->conexion->query($sql)){
             return 1;
        }
        else{
            return 0;
        }
    }
    public function updateDatosv2($id, $data){
        $sql ="UPDATE  verificacacion_check SET ResultadosAudi	='$data' WHERE id='$id'";
        if($this->conexion->conexion->query($sql)){
             return 1;
        }
        else{
            return 0;
        }
    }

    public function updateDatosv3($id, $data, $data1){
        $sql ="UPDATE  verificacacion_check SET ResultadosAudi='$data',informafinal='$data1' WHERE id='$id'";
        if($this->conexion->conexion->query($sql)){
             return 1;
            
        }
        else{
            return 0;
        }
    }


    

    function listar_combo_Empresa(){
        $sql = "call lista_Empresa_combo()";
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
