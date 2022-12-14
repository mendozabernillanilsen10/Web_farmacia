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
    public partial class Ventas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static object llenarProducto()
        {
            var lista = Capa_N_Productos.CN_ListarProductos();
            List<Producto> listauser = new List<Producto>();

            foreach (DataRow dr in lista.Rows)
            {
                listauser.Add(new Producto(dr["id_producto"].ToString(), dr["id_tipo_producto"].ToString()
                     , dr["nombre_producto"].ToString(), dr["precio_producto"].ToString(),
                      dr["presentacion_producto"].ToString(), dr["nombre_tipo_producto"].ToString(),
                      dr["id_marca"].ToString(), dr["nombre_marca"].ToString(),
                      dr["nombre_sub_categoria"].ToString(),
                      dr["id_sub_categoria"].ToString(), dr["id_estado"].ToString(),
                      dr["nombre_estado"].ToString(), dr["foto"].ToString(),
                      dr["stock"].ToString())

                    );

            }

            object json = new { data = listauser };
            return json;

        }

        [WebMethod]
        public static string llenarCLientes()
        {
            var query = cliente.CN_ListarClientes();

            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }

        [WebMethod]
        public static string llenarComprobantes()
        {
            var query = Capa_N_comprovantes.CN_ListarComprobantes();
            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }



    }
}