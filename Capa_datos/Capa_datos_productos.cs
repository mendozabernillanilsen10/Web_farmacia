using capa_Entidad;
using System;
using System.Data;
using System.Data.SqlClient;

namespace Capa_datos
{
    public class Capa_datos_productos
    {

        public DataTable CD_lista_Productos()
        {
            SqlDataReader resultado;
            DataTable tabla = new DataTable();
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand comando = new SqlCommand("[dbo].[Get_lista_produtos]", con);
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










        public int CD_InsertarProductoa(Producto p)
        {
            int i = -1;
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[Set_insertar_productos]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                cmd.Parameters.Add("@nombre", SqlDbType.VarChar).Value = p.nombre_producto;
                cmd.Parameters.Add("@prec", SqlDbType.VarChar).Value = p.precio_producto;
                cmd.Parameters.Add("@presentacion", SqlDbType.VarChar).Value = p.presentacion_producto;
                cmd.Parameters.Add("@id_tipoP", SqlDbType.VarChar).Value = p.id_tipo_producto;
                cmd.Parameters.Add("@id_mar", SqlDbType.VarChar).Value =p.id_marca;
                cmd.Parameters.Add("@id_subC", SqlDbType.VarChar).Value = p.id_sub_categoria;
                cmd.Parameters.Add("@id_es", SqlDbType.VarChar).Value = p.id_estado;
                cmd.Parameters.Add("@canti", SqlDbType.VarChar).Value = p.cantidad;
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


        public int CD_ActulizarProducto(Producto p)
        {
            int i = -1;
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[sp_set_actualizardatosProducto]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                cmd.Parameters.Add("@nombre", SqlDbType.VarChar).Value = p.nombre_producto;
                cmd.Parameters.Add("@precio", SqlDbType.VarChar).Value = p.precio_producto;
                cmd.Parameters.Add("@presentacion", SqlDbType.VarChar).Value = p.presentacion_producto;
                cmd.Parameters.Add("@id", SqlDbType.VarChar).Value = p.id_producto;
                cmd.Parameters.Add("@canti", SqlDbType.VarChar).Value = p.cantidad;
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
                SqlCommand cmd = new SqlCommand("[dbo].[sp_set_actualizarProducto]", con);
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
