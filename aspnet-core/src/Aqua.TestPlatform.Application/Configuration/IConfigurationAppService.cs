using System.Threading.Tasks;
using Aqua.TestPlatform.Configuration.Dto;

namespace Aqua.TestPlatform.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
