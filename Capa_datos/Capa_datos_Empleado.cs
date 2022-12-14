using capa_Entidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_datos
{
    public class Capa_datos_Empleado
    {

        public DataTable CD_ListarEmpleado()
        {
            SqlDataReader resultado;
            DataTable tabla = new DataTable();
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand comando = new SqlCommand("[dbo].[Get_listaTrabajadores]", con);
                comando.CommandType = CommandType.StoredProcedure;
                con.Open();
                resultado = comando.ExecuteReader();
                tabla.Load(resultado);
                return tabla;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State == ConnectionState.Open) con.Close();
            }
        }


        public int CD_InsertarEmpleado(Persona CEDatos)
        {
            int i = -1;
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[set_inserta_Empleado]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                cmd.Parameters.Add("@nombreDireccion", SqlDbType.VarChar).Value = CEDatos.nombreDireccion;
                cmd.Parameters.Add("@id_distrito", SqlDbType.VarChar).Value = CEDatos.id_distrito;
                cmd.Parameters.Add("@dni", SqlDbType.VarChar).Value = CEDatos.dni;
                cmd.Parameters.Add("@nombres", SqlDbType.VarChar).Value = CEDatos.nombres;
                cmd.Parameters.Add("@apellidos", SqlDbType.VarChar).Value = CEDatos.apellidos;
                cmd.Parameters.Add("@fecha_nacimiento", SqlDbType.VarChar).Value = CEDatos.fecha_nacimiento.ToString("yyyy-MM-dd");
                cmd.Parameters.Add("@id_genero", SqlDbType.VarChar).Value = CEDatos.id_genero;
                cmd.Parameters.Add("@id_es", SqlDbType.VarChar).Value = CEDatos.id_estado;
                if (cmd.ExecuteNonQuery() > 0)
                {
                    i = 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State == ConnectionState.Open) con.Close();
            }

            return i;

        }

        public int CD_ActulizarEmpleado(Persona user)
        {
            SqlConnection con = new SqlConnection();
            int i = -1;
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("sp_set_actualizardatosEmpleado", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                cmd.Parameters.Add("@idd", SqlDbType.VarChar).Value = user.id;
                cmd.Parameters.Add("@nombre", SqlDbType.VarChar).Value = user.nombres;
                cmd.Parameters.Add("@apellido", SqlDbType.VarChar).Value = user.apellidos;
                cmd.Parameters.Add("@dni", SqlDbType.VarChar).Value = user.dni;

                if (cmd.ExecuteNonQuery() > 0)
                {
                    i = 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State == ConnectionState.Open) con.Close();
            }

            return i;
        }


        public int ActulizaEstado(estado es)
        {
            SqlConnection con = new SqlConnection();
            int i = 0;

            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[sp_set_actualizarEstadoEmpleado]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@id", SqlDbType.VarChar).Value = es.id;
                cmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = es.id_estado;
                con.Open();

                if (cmd.ExecuteNonQuery() == 1)
                {

                    i = 1;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State == ConnectionState.Open) con.Close();
            }

            return i;

        }


    }
}
