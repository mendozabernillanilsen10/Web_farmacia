using Capa_datos;
using System.Data;

namespace Capa_Negocio
{
    public class Capa_N_tipoProducto
    {
        public static DataTable CN_ListarTipoProducto()
        {
            Capa_datos_tipo_producto datos = new Capa_datos_tipo_producto();
            return datos.CD_ListarTipoProducto();

        }

        public static DataTable CN_ListarCategoria()
        {
            Capa_datos_tipo_producto datos = new Capa_datos_tipo_producto();
            return datos.CD_ListarCategorias();

        }


        public static DataTable CN_listasubCategorias(string id)
        {
            Capa_datos_tipo_producto datos = new Capa_datos_tipo_producto();
            return datos.CD_buscarSubCategorias(id);
        }

    }
}
