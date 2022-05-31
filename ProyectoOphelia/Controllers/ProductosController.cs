using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoOphelia.Modelos;

namespace ProyectoOphelia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductosController : ControllerBase
    {
        [HttpGet]
        public IActionResult ObtenerProductos()
        {
            Resultado res = new Resultado();
            try
            {
                using (ANGULAR_NETCORE_DIGITALWAREContext BaseDatos = new ANGULAR_NETCORE_DIGITALWAREContext())
                {
                    var lista = BaseDatos.Productos.ToList();
                    res.ObjetoGenerico = lista;
                    //return Ok(lista);
                }
            }
            catch (Exception ex)
            {
                res.Error = "Se produjo un error al obtener los productos " + ex.Message;
            }
            return Ok(res);

        }
    }
}
