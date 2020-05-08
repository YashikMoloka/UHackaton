using Abp.MultiTenancy;
using Aqua.TestPlatform.Authorization.Users;

namespace Aqua.TestPlatform.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}
