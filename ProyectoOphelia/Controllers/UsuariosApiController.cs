using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoOphelia.Modelos;
using ProyectoOphelia.Modelos.ViewModels;
using ProyectoOphelia.Servicios;
using System.Text;

namespace ProyectoOphelia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UsuariosApiController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private IUsuarioApi usuarioApiServicio;
        public UsuariosApiController(IConfiguration configuration, IUsuarioApi usuarioApiServicio)
        {
            this.configuration = configuration;
            this.usuarioApiServicio = usuarioApiServicio;
        }

        //Se utiliza de una manera temporal 
        //[HttpPost("alta")]
        //public IActionResult AltaUsuario(AuthApi usuarioApi)
        //{
        //    Resultado res = new Resultado();
        //    try
        //    {
        //        byte[] keyBbyte = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
        //        Util util = new Util(keyBbyte);
        //        using (ANGULAR_NETCORE_DIGITALWAREContext basedatos = new ANGULAR_NETCORE_DIGITALWAREContext())
        //        {
        //            UsuariosApi api = new UsuariosApi();
        //            api.Email = usuarioApi.email;
        //            api.Password = Encoding.ASCII.GetBytes(util.cifrar(usuarioApi.password, configuration["ClaveCifrado"]));
        //            api.FechaAlta = DateTime.Now;
        //            basedatos.UsuariosApis.Add(api);
        //            basedatos.SaveChanges();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        res.Error = "Se produjo un error al ingresar el usuario de la API " + ex.ToString();
        //        res.Texto = "Se produjo un error, intentelo de nuevo.";
        //    }
        //    return Ok(res);
        //}

        [HttpPost]
        public IActionResult ObtenerUsuarioApi(AuthApiViewModel auth)
        {
            Resultado res = new Resultado();
            try
            {
                res.ObjetoGenerico = usuarioApiServicio.Autenticacion(auth);

            }
            catch (Exception ex)
            {
                res.Error = "Se produjo un error al ingresar el usuario de la API " + ex.ToString();
                res.Texto = "Se produjo un error, intentelo de nuevo.";
            }
            return Ok(res);
        }
    }
}
