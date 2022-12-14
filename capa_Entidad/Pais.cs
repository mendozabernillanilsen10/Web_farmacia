using System;

namespace capa_Entidad
{
    public class Pais
    {

        public Pais()
        {

        }
        public string idPais { get; set; }
        public String nacionalidad { get; set; }

        public Pais(string idPais, string nacionalidad)
        {
            this.idPais = idPais;
            this.nacionalidad = nacionalidad;
        }



    }
}
