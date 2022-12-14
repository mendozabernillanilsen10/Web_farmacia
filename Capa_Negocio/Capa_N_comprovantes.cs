using Capa_datos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
    public class Capa_N_comprovantes
    {

        public static DataTable CN_ListarComprobantes()
        {
            Capa_datos_comprobantes datos = new Capa_datos_comprobantes();
            return datos.CD_comprovante();

        }

    }
}
