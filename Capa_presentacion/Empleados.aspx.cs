using capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Capa_presentacion
{
    public partial class Empleados : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static int actulizares(estado objUsuario)
        {
            var respuesta = Capa_N_Empleados.CN_actulizar(objUsuario);
            return respuesta;
        }


        [WebMethod]
        public static int actulizarEmpleado(Persona user)
        {
            var respuesta = Capa_N_Empleados.CN_ActulizarEmpleado(user);
            return respuesta;
        }








        [WebMethod]

        public static int InsertarEmpleado(Persona p)
        {
            var r = Capa_N_Empleados.CN_InsertarEmpleado(p);
            return r;
        }

        [WebMethod]
        public static object getUsers()
        {
            var lista = Capa_N_Empleados.CN_ListarEmpleados();
            List<Usuario> listauser = new List<Usuario>();
  
            foreach (DataRow dr in lista.Rows)
            {
             
                listauser.Add(new Usuario(dr["id"].ToString()
                    , dr["Nombre"].ToString(), dr["Apellido"].ToString(),
                    dr["Dni"].ToString(), dr["Estado"].ToString()));

            }

            object json = new { data = listauser };
            return json;

        }



        [WebMethod]
        public static object getListaPais()
        {
            var listaPais = Capa_N_pais.CN_ListarPais();
            List<Pais> lista = new List<Pais>();


            foreach (DataRow dr in listaPais.Rows)
            {
                lista.Add(new Pais(dr["idPais"].ToString(), dr["nacionalidad"].ToString()));
            }

            object json = new { data = lista };
            return json;
        }




        [WebMethod]
        public static string llenar()
        {

            var query = Capa_N_pais.CN_ListarPais();

            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }




        [WebMethod]
        public static string llenarnarDe(estado obejto)
        {
            var query = Capa_N_pais.CN_buscarDepartemento(obejto.id);
            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }

        [WebMethod]
        public static string llenarProvinvia(estado objeto)
        {
            var query = Capa_N_pais.CN_listaProvincia(objeto.id);
            return Newtonsoft.Json.JsonConvert.SerializeObject(query);
        }

        [WebMethod]
        public static string llenarDistrito(estado objeto)
        {
            var query = Capa_N_pais.CN_lista_Distrio(objeto.id);
            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }

        [WebMethod]
        public static string llenarEstado()
        {
            var query = Capa_N_Estado.CN_ListarEstado();

            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }

        [WebMethod]
        public static string llenarGenero()
        {
            var query = Capa_N_genero.CN_ListarGenero();
            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }


    }
}