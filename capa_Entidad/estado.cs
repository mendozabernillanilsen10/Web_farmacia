using System;

namespace capa_Entidad
{
    public class estado
    {

        public estado()
        {

        }
        public estado(string id, string id_estado)
        {
            this.id = id;
            this.id_estado = id_estado;
        }

        public String id { get; set; }
        public String id_estado { get; set; }
    }
}
