using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Aqua.TestPlatform.Configuration.Dto;

namespace Aqua.TestPlatform.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : TestPlatformAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
