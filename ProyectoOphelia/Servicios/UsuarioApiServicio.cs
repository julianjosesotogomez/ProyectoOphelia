using Microsoft.IdentityModel.Tokens;
using ProyectoOphelia.Modelos;
using ProyectoOphelia.Modelos.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProyectoOphelia.Servicios
{
    public class UsuarioApiServicio : IUsuarioApi
    {
        private readonly IConfiguration configuration;

        public UsuarioApiServicio(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public  UsuarioApiViewModel Autenticacion(AuthApiViewModel authApi)
        {
            UsuarioApiViewModel res = new UsuarioApiViewModel();
            byte[] keyBbyte = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
            Util util = new Util(keyBbyte);
            using (ANGULAR_NETCORE_DIGITALWAREContext basedatos = new ANGULAR_NETCORE_DIGITALWAREContext())
            {
                UsuariosApi usuarioApi = basedatos.UsuariosApis.Single(usuario => usuario.Email ==authApi.email );
                if (usuarioApi !=null & authApi.password ==  util.desCifrar(Encoding.ASCII.GetString(usuarioApi.Password), configuration["ClaveCifrado"]))
                {
                    res.email = usuarioApi.Email;
                    res.token = GenerarTokenJWT(authApi);
                }
                else
                {
                    throw new Exception("Usuario desconocido");
                }
                    
            }
            return res;
        }

        //Token
        private string GenerarTokenJWT(AuthApiViewModel usuarioAuth)
        {
            //Cabecera
            var _symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:ClaveSecreta"]));
            var _signingCredentials = new SigningCredentials(_symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var _Header = new JwtHeader(_signingCredentials);
            //Claims
            var _Claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email, usuarioAuth.email),
            };
            //PayLoad
            var _Payload = new JwtPayload(
                issuer: configuration["JWT:Issuer"],
                audience: configuration["JWT:Audience"],
                claims: _Claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddHours(24)); //Tiempo del TOKEN en permanecer en la aplicacion. 

            //Token
            var _Token = new JwtSecurityToken(_Header, _Payload);

            string token= new JwtSecurityTokenHandler().WriteToken(_Token);

            return token;
        }
    }
}
