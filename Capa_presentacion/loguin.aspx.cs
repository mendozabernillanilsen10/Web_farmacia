using capa_Entidad;
using Capa_Negocio;
using System;
using System.Web.Services;

namespace Capa_presentacion
{
    public partial class loguin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string Ingreso(Usuario objeto)
        {
            var query = Capa_N_loguin.CN_loguin(objeto);

            if (query != null)
            {
                return Newtonsoft.Json.JsonConvert.SerializeObject(query);
            }
            else
            {
                return "error"; ;
            }


        }
    }
}