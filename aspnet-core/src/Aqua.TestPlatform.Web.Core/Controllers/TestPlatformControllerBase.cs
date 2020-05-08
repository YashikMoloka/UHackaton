using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Aqua.TestPlatform.Controllers
{
    public abstract class TestPlatformControllerBase: AbpController
    {
        protected TestPlatformControllerBase()
        {
            LocalizationSourceName = TestPlatformConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
