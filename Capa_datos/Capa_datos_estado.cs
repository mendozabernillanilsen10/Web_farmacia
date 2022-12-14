using System;
using System.Data;
using System.Data.SqlClient;

namespace Capa_datos
{
    public class Capa_datos_estado
    {

        public DataTable CD_listaEstado()
        {
            SqlConnection con = new SqlConnection();


            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[get_lista_estado_cliente]", con);
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



    }
}
