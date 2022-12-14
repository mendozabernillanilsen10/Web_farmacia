using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capa_Entidad
{
    public class Categoria
    {
        public Categoria()
        {

        }
        public Categoria(string id_categoria, string nombre_categoria)
        {
            this.id_categoria = id_categoria;
            this.nombre_categoria = nombre_categoria;
        }

        public string id_categoria { get; set; }
        public string nombre_categoria { get; set; }
    }
}
