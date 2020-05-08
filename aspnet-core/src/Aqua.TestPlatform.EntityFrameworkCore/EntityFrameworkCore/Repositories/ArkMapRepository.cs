using System;
using System.Linq;
using System.Linq.Expressions;
using Abp.Collections.Extensions;
using Abp.EntityFrameworkCore;
using Aqua.TestPlatform.Entities;
using Microsoft.EntityFrameworkCore;

namespace Aqua.TestPlatform.EntityFrameworkCore.Repositories
{
    public class ArkMapRepository: TestPlatformRepositoryBase<ArkMap>
    {
        public ArkMapRepository(IDbContextProvider<TestPlatformDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override IQueryable<ArkMap> GetAllIncluding(params Expression<Func<ArkMap, object>>[] propertySelectors)
        {
            var query = GetQueryable();

            query = query
                .Include(t => t.ArkDinoTypes)
                .ThenInclude(t => t.ArkDinoEntities);

            return query;
        }
    }
}