using System.Collections.Generic;

namespace Aqua.TestPlatform.Authentication.External
{
    public interface IExternalAuthConfiguration
    {
        List<ExternalLoginProviderInfo> Providers { get; }
    }
}
