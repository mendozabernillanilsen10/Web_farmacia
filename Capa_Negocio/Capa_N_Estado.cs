using Capa_datos;
using System.Data;

namespace Capa_Negocio
{
    public class Capa_N_Estado
    {
        public static DataTable CN_ListarEstado()
        {
            Capa_datos_estado datos = new Capa_datos_estado();
            return datos.CD_listaEstado();

        }
    }
}
