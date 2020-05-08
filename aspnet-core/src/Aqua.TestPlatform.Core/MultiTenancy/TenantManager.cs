using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.MultiTenancy;
using Aqua.TestPlatform.Authorization.Users;
using Aqua.TestPlatform.Editions;

namespace Aqua.TestPlatform.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, User>
    {
        public TenantManager(
            IRepository<Tenant> tenantRepository, 
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository, 
            EditionManager editionManager,
            IAbpZeroFeatureValueStore featureValueStore) 
            : base(
                tenantRepository, 
                tenantFeatureRepository, 
                editionManager,
                featureValueStore)
        {
        }
    }
}
