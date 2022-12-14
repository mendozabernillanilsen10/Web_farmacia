using Capa_datos;
using capa_Entidad;
using System.Data;

namespace Capa_Negocio
{
    public class Capa_N_loguin
    {
        public static DataTable CN_loguin(Usuario p)
        {
            Capa_loguin datos = new Capa_loguin();
            return datos.CD_Loguin(p);

        }

    }
}
