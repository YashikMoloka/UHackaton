using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace Aqua.TestPlatform.Localization
{
    public static class TestPlatformLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(TestPlatformConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(TestPlatformLocalizationConfigurer).GetAssembly(),
                        "Aqua.TestPlatform.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
