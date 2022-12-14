using capa_Entidad;
using System;
using System.Data;
using System.Data.SqlClient;

namespace Capa_datos
{
    public class Capa_loguin
    {
        public DataTable CD_Loguin(Usuario p)
        {
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();


                SqlCommand cmd = new SqlCommand("[dbo].[loguin]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@email", SqlDbType.VarChar).Value = p.correo;
                cmd.Parameters.Add("@clave", SqlDbType.VarChar).Value = p.clave;
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
