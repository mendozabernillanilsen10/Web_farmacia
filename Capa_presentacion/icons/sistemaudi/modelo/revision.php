<?php
class Revision {
    private $conexion;
    function __construct (){
        require_once 'modelo_conexion.php';
        $this->conexion = new conexion();
        $this->conexion->conectar();
    }

  

    function Registrar_mejoraa($observa ,$prpuesta, $id_empresa  ){
        $sql = "call set_registroMejora('$observa','$prpuesta','$id_empresa')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            if ($row = mysqli_fetch_array($consulta)) {
                    return $id= trim($row[0]);
            }
            $this->conexion->cerrar();
        }
    }


    public function listar_listarRevision(){
        $sql = "call lista_Revision_mejora()";
        $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
    }


    public function Editar_data($id,$prpuesta,$observa){
        $sql = "call Set_modificar_datos_Revision('$id','$prpuesta' , '$observa')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            return 1;
            
        }else{
            return 0;
        }
    }
    public function eliminar($id){
        $sql = "call update_eliminar_Mejora('$id')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            return 1;
            
        }else{
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
