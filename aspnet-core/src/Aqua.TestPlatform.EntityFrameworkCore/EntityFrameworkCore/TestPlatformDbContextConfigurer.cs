using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Aqua.TestPlatform.EntityFrameworkCore
{
    public static class TestPlatformDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<TestPlatformDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<TestPlatformDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
