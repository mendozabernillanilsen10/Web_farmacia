<?php
    class Modelo_Empresa{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }

        function listar_Empresa(){
            $sql = "call listar_empresa()";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

				}
				return $arreglo;
				$this->conexion->cerrar();
			}
        }

        function Registrar_Empresa($razonSocial ,  $ruc,$direccion, $telefono, $email,  $gerente ,$foto){
            $sql = "call Set_Registro_Empresa ('$razonSocial','$ruc','$direccion','$telefono','$email','$gerente','$foto')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				if ($row = mysqli_fetch_array($consulta)) {
                        return $id= trim($row[0]);
				}
				$this->conexion->cerrar();
			}
        }

       function editarEstado ($id_empresa, $es){
          $sql= "UPDATE empresa SET estado='$es' WHERE id='$id_empresa'";
         if($this->conexion->conexion->query($sql)){
            return 1;
          }
            else{
                return 0;
            }
            $this->conexion->cerrar();
       }



        function Update_empresaV1($id_empresa ,$edith_Razon_social
        ,$edtihRuc ,$edith_direc, $edith_telefone,$edtih_email,$edith_gerente){

               $sql="UPDATE empresa SET razonSocial = '$edith_Razon_social',
               ruc = '$edtihRuc',direccion = '$edith_direc',telefono ='$edith_telefone',
               email='$edtih_email',gerente='$edith_gerente'  WHERE id='$id_empresa'";
                
                if($this->conexion->conexion->query($sql)){
                    return 1;
                }
                else{
                    return 0;
                }
                $this->conexion->cerrar();
              
        }

        function Update_empresaV2($id_empresa ,$edith_Razon_social
             ,$edtihRuc ,$edith_direc, $edith_telefone,$edtih_email,$edith_gerente,$NombreLogo){
                $sql="UPDATE empresa SET razonSocial = '$edith_Razon_social',
                ruc = '$edtihRuc',direccion = '$edith_direc',telefono ='$edith_telefone',
                email='$edtih_email',gerente='$edith_gerente',logo='$NombreLogo'  WHERE id='$id_empresa'";
                  if($this->conexion->conexion->query($sql)){
                      return 1;
                  }
                  else{
                      return 0;
                  }
                  $this->conexion->cerrar();
        }


    }
?>