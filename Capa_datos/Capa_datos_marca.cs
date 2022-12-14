using System;
using System.Data;
using System.Data.SqlClient;

namespace Capa_datos
{
    public class Capa_datos_marca
    {

        public DataTable CD_ListarMarca()
        {
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[get_listamarca]", con);
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
