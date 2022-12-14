<?php
class Plan{
    private $conexion;
    function __construct (){
        require_once 'modelo_conexion.php';
        $this->conexion = new conexion();
        $this->conexion->conectar();
    }

    function Registrar_Plan($fecha_inicio ,$fecha_final, $id_empresa,   $filenameCronograma,$nombreAlcanzable){
        $sql = "call Set_Registro_Planes('$fecha_inicio','$fecha_final','$id_empresa','$filenameCronograma','$nombreAlcanzable')";
        if ($consulta = $this->conexion->conexion->query($sql)) {
            if ($row = mysqli_fetch_array($consulta)) {
                    return $id= trim($row[0]);
            }
            $this->conexion->cerrar();
        }
    }

    function updateDatosv1($id,$fecha_inicio,$fecha_final){
        $sql="UPDATE plan SET fehaInicioAudi = '$fecha_inicio',
        fechaFinAudi = '$fecha_final' WHERE id='$id'";
         if($this->conexion->conexion->query($sql)){
             return 1;
         }
         else{
             return 0;
         }
         $this->conexion->cerrar();
    }
    
    function updateDatosv2($id,$fecha_inicio,$fecha_final,$nombreAlcanzable){
        $sql="UPDATE plan SET fehaInicioAudi = '$fecha_inicio',
        fechaFinAudi = '$fecha_final',DocumentoAlcanceAudi='$nombreAlcanzable' WHERE id='$id'";
         if($this->conexion->conexion->query($sql)){
             return 1;
         }
         else{
             return 0;
         }
         $this->conexion->cerrar();
    }
    
    function updateDatosv3($id,$fecha_inicio,$fecha_final,$filenameCronograma){
        $sql="UPDATE plan SET fehaInicioAudi = '$fecha_inicio',
        fechaFinAudi = '$fecha_final',cronogramaAudia='$filenameCronograma' WHERE id='$id'";
         if($this->conexion->conexion->query($sql)){
             return 1;
         }
         else{
             return 0;
         }
         $this->conexion->cerrar();
    }

    function updateDatosv4($id,$fecha_inicio,$fecha_final,$filenameCronograma,$nombreAlcanzable){
        $sql="UPDATE plan SET fehaInicioAudi = '$fecha_inicio',
        fechaFinAudi = '$fecha_final',cronogramaAudia='$filenameCronograma',DocumentoAlcanceAudi='$nombreAlcanzable' WHERE id='$id'";
         if($this->conexion->conexion->query($sql)){
             return 1;
         }
         else{
             return 0;
         }
         $this->conexion->cerrar();
    }

    public function eliminar($idf,$id_empresa){
        $sql= "DELETE from plan where id='$idf'";
        if($this->conexion->conexion->query($sql)){
            $sql1="UPDATE empresa SET planEstado=0 WHERE  id='$id_empresa'";
            if($this->conexion->conexion->query($sql1)){
                return 1;
            }
        }
        else{
            return 0;
        }



    }




    public function listar_planes(){
        $sql = "call lista_planes()";
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
