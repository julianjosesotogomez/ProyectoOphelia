using System;
using System.Collections.Generic;

namespace ProyectoOphelia.Modelos
{
    public partial class LineaPedido
    {
        public int Id { get; set; }
        public int IdPedido { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public decimal ImporteUnitario { get; set; }

        public virtual Pedido IdPedidoNavigation { get; set; } = null!;
        public virtual Producto IdProductoNavigation { get; set; } = null!;
    }
}
