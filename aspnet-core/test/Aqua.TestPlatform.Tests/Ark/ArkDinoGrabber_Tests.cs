using System;
using System.Threading.Tasks;
using Abp.ObjectMapping;
using Aqua.TestPlatform.Entities;
using Aqua.TestPlatform.Workers;
using Newtonsoft.Json;
using Xunit;
using Xunit.Abstractions;

namespace Aqua.TestPlatform.Tests.Ark
{
    public class ArkDinoGrabber_Tests : TestPlatformTestBase
    {
        private readonly ITestOutputHelper _testOutputHelper;
        private ArkDinoGrabber _arkDinoGrabber;
        private IObjectMapper _objMap;

        public ArkDinoGrabber_Tests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
            _arkDinoGrabber = Resolve<ArkDinoGrabber>();
            _objMap = Resolve<IObjectMapper>();
        }

        [Fact]
        public async Task GetMapsFromSite()
        {
            var maps = await _arkDinoGrabber.GetMaps();
            _testOutputHelper.WriteLine(JsonConvert.SerializeObject(maps));
            Assert.NotEmpty(maps);
        }

        [Fact]
        public async Task GetAllDinoFromMaps()
        {
            var dinos = await _arkDinoGrabber.GetAllDino();
            _testOutputHelper.WriteLine(JsonConvert.SerializeObject(dinos));
            Assert.NotEmpty(dinos);
        }
        
        
        [Fact]
        public async Task MapToEntity()
        {
            var dinos = new ArkDinoGrabber.ArkMapWithUrl("", "");
            var dinotype = new ArkDinoGrabber.ArkDinoTypeWithUrl("", "");
            var dinoentity = new ArkDinoEntity()
            {
                Level = 1,
                X = 1,
                Y = 1
            };
            
            dinotype.ArkDinoEntities.Add(dinoentity);
            dinos.ArkDinoTypes.Add(dinotype);

            var entity = _objMap.Map<ArkMap>(dinos);
            _testOutputHelper.WriteLine(JsonConvert.SerializeObject(entity));
            
        }
    }
}