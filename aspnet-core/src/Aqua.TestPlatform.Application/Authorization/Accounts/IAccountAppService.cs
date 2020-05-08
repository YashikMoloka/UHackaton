using System.Threading.Tasks;
using Abp.Application.Services;
using Aqua.TestPlatform.Authorization.Accounts.Dto;

namespace Aqua.TestPlatform.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
