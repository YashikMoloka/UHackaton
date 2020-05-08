using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Aqua.TestPlatform.Configuration;
using Aqua.TestPlatform.Web;

namespace Aqua.TestPlatform.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class TestPlatformDbContextFactory : IDesignTimeDbContextFactory<TestPlatformDbContext>
    {
        public TestPlatformDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<TestPlatformDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            TestPlatformDbContextConfigurer.Configure(builder, configuration.GetConnectionString(TestPlatformConsts.ConnectionStringName));

            return new TestPlatformDbContext(builder.Options);
        }
    }
}
