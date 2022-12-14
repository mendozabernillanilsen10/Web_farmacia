using Capa_datos;
using capa_Entidad;
using System;
using System.Data;

namespace Capa_Negocio
{
    public class cliente
    {

        public static DataTable CN_ListarClientes()
        {
            Capa_datos_Clientes datos = new Capa_datos_Clientes();
            return datos.CD_ListarClientes();

        }


        public static int CN_ActulizarClinete(Persona user)
        {
            Capa_datos_Clientes datos = new Capa_datos_Clientes();
            return datos.CD_ActulizarCliente(user);
        }

       
        public static int CN_actulizar(estado es)
        {
            Capa_datos_Clientes datos = new Capa_datos_Clientes();
            return datos.ActulizaEstado(es);

        }



        public static int CN_InsertarClientes(Persona p)
        {
            Capa_datos_Clientes datos = new Capa_datos_Clientes();
            return datos.CD_InsertarCliente(p);

        }
    }
}
