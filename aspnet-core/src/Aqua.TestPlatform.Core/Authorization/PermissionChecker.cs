using Abp.Authorization;
using Aqua.TestPlatform.Authorization.Roles;
using Aqua.TestPlatform.Authorization.Users;

namespace Aqua.TestPlatform.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
