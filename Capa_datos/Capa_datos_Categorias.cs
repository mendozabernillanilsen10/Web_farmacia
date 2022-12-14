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
    public class Capa_datos_Categorias
    {

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



        public int CD_InsertarCategoria(Categoria CEDatos)
        {
            int i = -1;
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[Set_Insertar_categeria]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                cmd.Parameters.Add("@nombre", SqlDbType.VarChar).Value = CEDatos.nombre_categoria;
                
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
       

           public int CD_actulizarCategoria(Categoria CEDatos)
        {
            int i = -1;
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[Set_actualizar_categeria]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                cmd.Parameters.Add("@nombre", SqlDbType.VarChar).Value = CEDatos.nombre_categoria;
                cmd.Parameters.Add("@id", SqlDbType.VarChar).Value = CEDatos.id_categoria;

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



    }
}
