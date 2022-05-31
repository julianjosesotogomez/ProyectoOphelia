using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoOphelia.Modelos;
using ProyectoOphelia.Modelos.ViewModels;
using System.Text;

namespace ProyectoOphelia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly IConfiguration configuration;
        public ClientesController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public IActionResult ObtenerClientes()
        {
            Resultado res = new Resultado();
            try
            {
                using (ANGULAR_NETCORE_DIGITALWAREContext BaseDatos = new ANGULAR_NETCORE_DIGITALWAREContext())
                {
                    var lista = BaseDatos.Clientes.ToList();
                    res.ObjetoGenerico = lista;
                    //return Ok(lista);
                }
            }
            catch (Exception ex)
            {
                res.Error="Se produjo un error al obtener los clientes " + ex.Message;
                res.Texto = "Se produjo un error al consultar.";

            }
            return Ok(res); 

        }

        [HttpPost]
        public IActionResult InsertarCliente(ClienteViewModel c)
        {
            Resultado res = new Resultado();
            try
            {
                byte[] keyBbyte = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
                Util util = new Util(keyBbyte);

                using (ANGULAR_NETCORE_DIGITALWAREContext BaseDatos = new ANGULAR_NETCORE_DIGITALWAREContext())
                {
                    Cliente cliente = new Cliente();
                    cliente.Nombre = c.Nombre;
                    cliente.Edad = c.Edad;
                    cliente.Email = c.Email;
                    cliente.Password = Encoding.ASCII.GetBytes(util.cifrar(c.Password, configuration["ClaveCifrado"]));
                    cliente.FechaAlta = DateTime.Now;
                    BaseDatos.Clientes.Add(cliente);
                    BaseDatos.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                res.Error = "Se produjo un error al obtener el ingreso del cliente " + ex.Message;
                res.Texto = "Se produjo un error al registrar un cliente.";
            }
            return Ok(res);
        }

        [HttpPut]
        public IActionResult EditarCliente(ClienteViewModel c)
        {
            Resultado res = new Resultado();
            try
            {
                byte[] keyBbyte = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
                Util util = new Util(keyBbyte);

                using (ANGULAR_NETCORE_DIGITALWAREContext BaseDatos = new ANGULAR_NETCORE_DIGITALWAREContext())
                {
                    Cliente cliente = BaseDatos.Clientes.Single(cli => cli.Email == c.Email);
                    cliente.Nombre = c.Nombre;
                    cliente.Edad = c.Edad;
                    //cliente.Email = c.Email; -> No se le permite modificar el email, por el cual es el que se localiza. 
                    cliente.Password = Encoding.ASCII.GetBytes(util.cifrar(c.Password, configuration["ClaveCifrado"]));
                    BaseDatos.Entry(cliente).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    BaseDatos.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                res.Error = "Se produjo un error al modificar un cliente  " + ex.Message;
                res.Texto = "Se produjo un error al modificar un registro.";
            }
            return Ok(res);
        }

        [HttpDelete("{Email}")]
        public IActionResult EliminarCliente(String Email)
        {
            Resultado res = new Resultado();
            try
            {


                using (ANGULAR_NETCORE_DIGITALWAREContext BaseDatos = new ANGULAR_NETCORE_DIGITALWAREContext())
                {
                    Cliente cliente = BaseDatos.Clientes.Single(cli => cli.Email == Email);
                    BaseDatos.Remove(cliente);
                    BaseDatos.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                res.Error = "Se produjo un error al eliminar el cliente " + ex.Message;
                res.Texto = "Se produjo un error al eliminar un cliente.";

            }
            return Ok(res);
        }
    }
}
