using System;
using System.Data;
using System.Data.SqlClient;

namespace Capa_datos
{
    public class Capa_datos_pais
    {


        public DataTable CD_ListarPais()
        {
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();
                SqlCommand cmd = new SqlCommand("[dbo].[get_listaPais]", con);
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


        public DataTable CD_buscarDepartemtno(string id)
        {

            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();

                SqlCommand cmd = new SqlCommand("[dbo].[Get_Departamento]", con);
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



        public DataTable Cd_listaProvincia(string id)
        {
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();

                SqlCommand cmd = new SqlCommand("[dbo].[Get_provincia]", con);
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

        public DataTable Cd_lista_Distrito(string id)
        {
            SqlConnection con = new SqlConnection();
            try
            {
                con = conexion.crearInstancia().crearConexion();

                SqlCommand cmd = new SqlCommand("[dbo].[Get_Distrito]", con);
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
