using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Aqua.TestPlatform.Authorization.Roles;
using Aqua.TestPlatform.Authorization.Users;
using Aqua.TestPlatform.Entities;
using Aqua.TestPlatform.MultiTenancy;

namespace Aqua.TestPlatform.EntityFrameworkCore
{
    public class TestPlatformDbContext : AbpZeroDbContext<Tenant, Role, User, TestPlatformDbContext>
    {
        public DbSet<ArkMap> ArkMaps { get; set; }
        public DbSet<ArkDinoType> ArkDinoTypes { get; set; }
        public DbSet<ArkDinoEntity> ArkDinoEntities { get; set; }
        /* Define a DbSet for each entity of the application */
        
        public TestPlatformDbContext(DbContextOptions<TestPlatformDbContext> options)
            : base(options)
        {
        }
    }
}
