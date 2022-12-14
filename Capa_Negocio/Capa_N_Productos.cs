using Capa_datos;
using capa_Entidad;
using System.Data;

namespace Capa_Negocio
{
    public class Capa_N_Productos
    {
        public static DataTable CN_ListarProductos()
        {
            Capa_datos_productos datos = new Capa_datos_productos();
            return datos.CD_lista_Productos();

        }
        public static int CN_insertarProducto(Producto p)
        {
            Capa_datos_productos datos = new Capa_datos_productos();
            return datos.CD_InsertarProductoa(p);
        }

        public static int CN_actulizarProducto(Producto p)
        {
            Capa_datos_productos datos = new Capa_datos_productos();
            return datos.CD_ActulizarProducto(p);
        }

        public static int CN_actulizar(estado es)
        {
            Capa_datos_productos datos = new Capa_datos_productos();
            return datos.ActulizaEstado(es);

        }


    }



}
