using Capa_datos;
using capa_Entidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
    public class Capa_N_categorias
    {
        public static DataTable CN_ListarCategoria()
        {
            Capa_datos_Categorias datos = new Capa_datos_Categorias();
            return datos.CD_ListarCategorias();

        }

        public static int CN_insertarCategoria(Categoria c)
        {
            Capa_datos_Categorias datos = new Capa_datos_Categorias();
            return datos.CD_InsertarCategoria(c);
        }

        public static int CN_actualizar(Categoria c)
        {
            Capa_datos_Categorias datos = new Capa_datos_Categorias();

            return datos.CD_actulizarCategoria(c);
        }
    }
}
