using System;

namespace capa_Entidad
{
    public class Usuario
    {

        public Usuario()
        {

        }

        public Usuario(String id, String Nombre, String Apellido, String Dni, String Estado)
        {
            this.id = id;
            this.Nombre = Nombre;
            this.Apellido = Apellido;
            this.Dni = Dni;
            this.Estado = Estado;

        }

        public String correo { get; set; }
        public String clave { get; set; }


        public String id { get; set; }
        public String Nombre { get; set; }
        public String Apellido { get; set; }
        public String Dni { get; set; }
        public String Estado { get; set; }



    }
}
