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
    public partial class Categorias : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static object listar()
        {
            var lista = Capa_N_categorias.CN_ListarCategoria();

            List<Categoria> listauser = new List<Categoria>();

            foreach (DataRow dr in lista.Rows)
            {

                listauser.Add(new Categoria(dr["id_categoria"].ToString()
                    , dr["nombre_categoria"].ToString()));

            }

            object json = new { data = listauser };
            return json;

        }


        [WebMethod]

        public static int InsertarCategoria(Categoria p)
        {
            var r = Capa_N_categorias.CN_insertarCategoria(p);
            return r;
        }

        [WebMethod]

        public static int actualizarDatos(Categoria p)
        {
            var r = Capa_N_categorias.CN_actualizar(p);
            return r;
        }



    }
}