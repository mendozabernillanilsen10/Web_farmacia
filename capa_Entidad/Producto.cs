using System.Web;

namespace capa_Entidad
{
    public class Producto
    {
        public Producto()
        {

        }


        public Producto(string id_producto, string id_tipo_producto, string nombre_producto, string precio_producto, string presentacion_producto, string nombre_tipo_producto, string id_marca, string nombre_marca, string nombre_sub_categoria, string id_sub_categoria, string id_estado, string nombre_estado, string foto, string cantidad)
        {
            this.id_producto = id_producto;
            this.id_tipo_producto = id_tipo_producto;
            this.nombre_producto = nombre_producto;
            this.precio_producto = precio_producto;
            this.presentacion_producto = presentacion_producto;
            this.nombre_tipo_producto = nombre_tipo_producto;
            this.id_marca = id_marca;
            this.nombre_marca = nombre_marca;
            this.nombre_sub_categoria = nombre_sub_categoria;
            this.id_sub_categoria = id_sub_categoria;
            this.id_estado = id_estado;
            this.nombre_estado = nombre_estado;
            this.foto = foto;
            this.cantidad = cantidad;
        }

        public string id_producto { get; set; }
        public string id_tipo_producto { get; set; }
        public string nombre_producto { get; set; }
        public string precio_producto { get; set; }

        public string presentacion_producto { get; set; }

        public string nombre_tipo_producto { get; set; }
        public string id_marca { get; set; }
        public string nombre_marca { get; set; }
        public string nombre_sub_categoria { get; set; }
        public string id_sub_categoria { get; set; }
        public string id_estado { get; set; }

        public string nombre_estado { get; set; }

        public string foto { get; set; }
        public string cantidad {get; set;}
    }
}
