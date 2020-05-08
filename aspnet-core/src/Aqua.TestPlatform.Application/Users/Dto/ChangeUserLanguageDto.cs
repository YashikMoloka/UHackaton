using System.ComponentModel.DataAnnotations;

namespace Aqua.TestPlatform.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}