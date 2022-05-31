using System;
using System.Collections.Generic;

namespace ProyectoOphelia.Modelos
{
    public partial class Producto
    {
        public Producto()
        {
            LineaPedidos = new HashSet<LineaPedido>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal Precio { get; set; }
        public string Descripcion { get; set; } = null!;

        public virtual ICollection<LineaPedido> LineaPedidos { get; set; }
    }
}
