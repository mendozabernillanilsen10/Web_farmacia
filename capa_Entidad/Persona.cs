using System;

namespace capa_Entidad
{
    public class Persona
    {

        public Persona()
        {

        }

        public Persona(string nombreDireccion, string id_distrito, string dni, string nombres, string apellidos, DateTime fecha_nacimiento, string id_genero, string id_estado)
        {

            this.nombreDireccion = nombreDireccion;
            this.id_distrito = id_distrito;
            this.dni = dni;
            this.nombres = nombres;
            this.apellidos = apellidos;
            this.fecha_nacimiento = fecha_nacimiento;
            this.id_genero = id_genero;
            this.id_estado = id_estado;
        }

        public Persona(string id, string nombres, string apellidos, string dni)
        {
            this.id = id;
            this.nombres = nombres;
            this.apellidos = apellidos;
            this.dni = dni;

        }
        public string id { get; set; }
        public string nombreDireccion { get; set; }
        public string id_distrito { get; set; }
        public string dni { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public DateTime fecha_nacimiento { get; set; }

        public string id_genero { get; set; }
        public string id_estado { get; set; }

    }

}
