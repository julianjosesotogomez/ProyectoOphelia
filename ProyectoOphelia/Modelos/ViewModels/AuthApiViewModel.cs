using System.ComponentModel.DataAnnotations;

namespace ProyectoOphelia.Modelos.ViewModels
{
    public class AuthApiViewModel
    {
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
    }
}
