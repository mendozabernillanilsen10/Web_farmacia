using System;
using System.Data;
using System.Data.SqlClient;

namespace Capa_datos
{
    public class Capa_datos_tipo_producto
    {

        public DataTable CD_ListarTipoProducto()
        {
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[get_listaTiposProducto]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                return dt;
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


        public DataTable CD_ListarCategorias()
        {
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[get_lista_categoria]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                return dt;
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


        public DataTable CD_buscarSubCategorias(string id)
        {

            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();

                SqlCommand cmd = new SqlCommand("[dbo].[Get_subCategoria]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@texto", SqlDbType.VarChar).Value = id;
                con.Open();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                return dt;
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



    }
}
