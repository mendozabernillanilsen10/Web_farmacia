using System;
using System.Data.SqlClient;

namespace Capa_datos
{
    class conexion
    {
        private string Base;
        private string servidor;
        private string usuario;
        private string Clave;
        private bool seguridad;
        private static conexion con = null;


        private conexion()
        {
            this.Base = "botica";
            this.servidor = "DESKTOP-T796H4K";
            this.usuario = "";
            this.Clave = "";
            this.seguridad = true;
        }
        public SqlConnection crearConexion()
        {
            SqlConnection cadena = new SqlConnection();
            try
            {
                cadena.ConnectionString = "Server=" + this.servidor + "; Database=" + this.Base + ";";

                if (this.seguridad)
                {
                    cadena.ConnectionString = cadena.ConnectionString + "Integrated Security = SSPI";
                }
                else
                {
                    cadena.ConnectionString = cadena.ConnectionString + "User id=" + this.usuario + ";Password=" + this.Clave;

                }
            }
            catch (Exception ex)
            {
                cadena = null;
                throw ex;
            }
            return cadena;



        }

        public static conexion crearInstancia()
        {
            if (con == null)
            {
                con = new conexion();
            }
            return con;
        }

    }
}
