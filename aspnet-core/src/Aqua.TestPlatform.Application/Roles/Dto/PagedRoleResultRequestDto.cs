using Abp.Application.Services.Dto;

namespace Aqua.TestPlatform.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

