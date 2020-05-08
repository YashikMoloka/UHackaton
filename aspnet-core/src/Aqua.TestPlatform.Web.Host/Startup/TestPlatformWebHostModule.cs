using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Aqua.TestPlatform.Configuration;

namespace Aqua.TestPlatform.Web.Host.Startup
{
    [DependsOn(
       typeof(TestPlatformWebCoreModule))]
    public class TestPlatformWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public TestPlatformWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(TestPlatformWebHostModule).GetAssembly());
        }
    }
}
