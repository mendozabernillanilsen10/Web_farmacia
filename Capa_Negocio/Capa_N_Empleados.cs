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
    public class Capa_N_Empleados
    {

        public static DataTable CN_ListarEmpleados()
        {
            Capa_datos_Empleado datos = new Capa_datos_Empleado();
            return datos.CD_ListarEmpleado();

        }

        public static int CN_InsertarEmpleado(Persona p)
        {
            Capa_datos_Empleado datos = new Capa_datos_Empleado();
            return datos.CD_InsertarEmpleado(p);
        }


        public static int CN_ActulizarEmpleado(Persona user)
        {
            Capa_datos_Empleado datos = new Capa_datos_Empleado();
            return datos.CD_ActulizarEmpleado(user);
        }

        public static int CN_actulizar(estado es)
        {
            Capa_datos_Empleado datos = new Capa_datos_Empleado();
            return datos.ActulizaEstado(es);

        }

    }
}
