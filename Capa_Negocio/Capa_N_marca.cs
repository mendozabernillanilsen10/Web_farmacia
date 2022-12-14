using Capa_datos;
using System.Data;

namespace Capa_Negocio
{
    public class Capa_N_marca
    {
        public static DataTable CN_ListarMarca()
        {
            Capa_datos_marca datos = new Capa_datos_marca();
            return datos.CD_ListarMarca();

        }
    }
}
