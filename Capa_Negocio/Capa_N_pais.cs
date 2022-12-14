using Capa_datos;
using System.Data;

namespace Capa_Negocio
{
    public class Capa_N_pais
    {

        public static DataTable CN_ListarPais()
        {
            Capa_datos_pais datos = new Capa_datos_pais();
            return datos.CD_ListarPais();

        }
        public static DataTable CN_buscarDepartemento(string id)
        {
            Capa_datos_pais datos = new Capa_datos_pais();
            return datos.CD_buscarDepartemtno(id);

        }
        public static DataTable CN_listaProvincia(string id)
        {
            Capa_datos_pais datos = new Capa_datos_pais();
            return datos.Cd_listaProvincia(id);
        }
        public static DataTable CN_lista_Distrio(string id)
        {
            Capa_datos_pais datos = new Capa_datos_pais();
            return datos.Cd_lista_Distrito(id);
        }

    }
}
