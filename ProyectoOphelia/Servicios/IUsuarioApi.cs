using ProyectoOphelia.Modelos.ViewModels;

namespace ProyectoOphelia.Servicios
{
    public interface IUsuarioApi
    {
        public UsuarioApiViewModel Autenticacion(AuthApiViewModel authApi);
    }
}
