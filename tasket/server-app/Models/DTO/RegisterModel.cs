using System.ComponentModel.DataAnnotations;

namespace server_app.Models.DTO
{
    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set;}
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage ="Password must be complex")]
        public string Password {get; set; }
        [Required]
        public string Username { get; set; }

        
    }
}