using capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Services;

namespace Capa_presentacion
{
    public partial class vista_productos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static int insertarProductos(Producto p)
        {
            var  r = Capa_N_Productos.CN_insertarProducto(p);
            return r;
        }

        [WebMethod]
        public static int actulizarProducto(Producto p)
        {
            var r = Capa_N_Productos.CN_actulizarProducto(p);
            return r;
        }



        [WebMethod]
        public static object llenarProducto()
        {
            var lista = Capa_N_Productos.CN_ListarProductos();
            List<Producto> listauser = new List<Producto>();

            foreach (DataRow dr in lista.Rows)
            {
                listauser.Add(new Producto( dr["id_producto"].ToString(), dr["id_tipo_producto"].ToString()
                     ,dr["nombre_producto"].ToString(), dr["precio_producto"].ToString(),
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
        public static int actulizares(estado ob)
        {
            var respuesta = Capa_N_Productos.CN_actulizar(ob);
            return respuesta;
        }





        [WebMethod]
        public static string listarTipoProducto()
        {
            var query = Capa_N_tipoProducto.CN_ListarTipoProducto();
            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }

        [WebMethod]
        public static string listarMarca()
        {
            var query = Capa_N_marca.CN_ListarMarca();
            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }

        [WebMethod]
        public static string listarCategorias()
        {
            var query = Capa_N_tipoProducto.CN_ListarCategoria();
            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }
        [WebMethod]
        public static string llenarSubCategorias(estado objeto)
        {
            var query = Capa_N_tipoProducto.CN_listasubCategorias(objeto.id);
            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }


        [WebMethod]
        public static string llenarEstado()
        {
            var query = Capa_N_Estado.CN_ListarEstado();

            return Newtonsoft.Json.JsonConvert.SerializeObject(query);

        }





    }
}