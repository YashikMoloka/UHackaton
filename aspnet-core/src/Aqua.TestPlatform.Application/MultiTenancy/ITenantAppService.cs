using Abp.Application.Services;
using Aqua.TestPlatform.MultiTenancy.Dto;

namespace Aqua.TestPlatform.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

