using System.Threading.Tasks;
using Abp.Application.Services;
using Aqua.TestPlatform.Sessions.Dto;

namespace Aqua.TestPlatform.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
