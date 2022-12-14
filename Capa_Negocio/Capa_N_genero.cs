using Capa_datos;
using System.Data;

namespace Capa_Negocio
{
    public class Capa_N_genero
    {

        public static DataTable CN_ListarGenero()
        {
            Capa_datos_Genero datos = new Capa_datos_Genero();
            return datos.CD_listaGenero();

        }

    }
}
