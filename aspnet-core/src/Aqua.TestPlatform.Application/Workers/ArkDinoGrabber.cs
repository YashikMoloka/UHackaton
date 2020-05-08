using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Abp.AutoMapper;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.ObjectMapping;
using Abp.Threading.BackgroundWorkers;
using Abp.Threading.Timers;
using AngleSharp;
using AngleSharp.Dom;
using Aqua.TestPlatform.Entities;
using Aqua.TransneftCabinet.Workers.TnsNewsLoader;

namespace Aqua.TestPlatform.Workers
{
    public class ArkDinoGrabber : PeriodicBackgroundWorkerBase, ISingletonDependency
    {
        public const string BaseUrl = "https://ark-servers.ru/templates/ark/dino.php?map=1";
        protected IRepository<ArkDinoEntity, int> _repositoryDinoEntity;
        protected IRepository<ArkDinoType, int> _repositoryDinoType;
        protected IRepository<ArkMap, int> _repositoryMap;
        protected IObjectMapper _objectMapper;

        public ArkDinoGrabber(AbpTimer timer, 
            IRepository<ArkDinoEntity, int> repositoryDinoEntity,
            IRepository<ArkDinoType, int> repositoryDinoType,
            IRepository<ArkMap, int> repositoryMap,
            IObjectMapper objectMapper) : base(timer)
        {
            Timer.Period = 1000 * 60 * 60 * 24;//24 hour
            _repositoryDinoEntity = repositoryDinoEntity;
            _repositoryDinoType = repositoryDinoType;
            _repositoryMap = repositoryMap;
            _objectMapper = objectMapper;
        }

        public void Refresh()
        {
            DoWork();
        }
        
        [UnitOfWork]
        protected override async void DoWork()
        {
            await GetAllDino();
        }

        public async Task<List<ArkMapWithUrl>> GetAllDino()
        {
            var maps = await GetMaps();
            foreach (var map in maps)
            {
                await GetMapData(map);
                foreach (var dinoTypeWithUrl in map.ArkDinoTypes)
                {
                    await GetDinoTypeData(dinoTypeWithUrl);
                }
            }

            ClearDb();

            foreach (var map in maps)
            {
                _repositoryMap.Insert(_objectMapper.Map<ArkMap>(map));
            }
            CurrentUnitOfWork.SaveChanges();
            return maps;
        }

        private void ClearDb()
        {
            _repositoryDinoEntity.Delete(t => true);
            _repositoryDinoType.Delete(t => true);
            _repositoryMap.Delete(t => true);
            CurrentUnitOfWork.SaveChanges();
        }

        private async Task GetDinoTypeData(ArkDinoTypeWithUrl dinoTypeWithUrl)
        {
            var document = await GetDataFromUrl(dinoTypeWithUrl.Url);

            var typesWithLevels = document.QuerySelectorAll("table tr>td>a");
            foreach (var element in typesWithLevels)
            {
                var url = element.Attributes["href"].Value;
                
                var documentDino = await GetDataFromUrl(url);
                var dinos = documentDino.QuerySelectorAll("table tr").Skip(1);
                foreach (var dino in dinos)
                {
                    var data = dino.QuerySelectorAll("td");
                    var textList = data.Skip(1).SkipLast(1).Select(s => s.TextContent).ToList();
                    dinoTypeWithUrl.ArkDinoEntities.Add(new ArkDinoEntity()
                    {
                        Level = Convert.ToInt32(textList[0]),
                        X = Convert.ToInt32(textList[1]),
                        Y = Convert.ToInt32(textList[2])
                    });
                }
            }
        }

        public async Task GetMapData(ArkMapWithUrl map)
        {
            var document = await GetDataFromUrl(map.Url);
            var types = document.QuerySelectorAll("table tr>td>a");
            foreach (var element in types)
            {
                var url = element.Attributes["href"].Value;
                var name = element.TextContent;
                map.ArkDinoTypes.Add(new ArkDinoTypeWithUrl(name, url));
            }
        }

        public async Task<List<ArkMapWithUrl>> GetMaps()
        {
            var list = new List<ArkMapWithUrl>();
            var docMap = await GetDataFromUrl(BaseUrl);
            var maphtml = docMap.QuerySelectorAll("body>h3>a");
            foreach (var element in maphtml)
            {
                var url = element.Attributes["href"].Value;
                var name = element.TextContent;
                list.Add(new ArkMapWithUrl(name, url));
            }

            return list;
        }


        public async Task<IDocument> GetDataFromUrl(string url)
        {
            var context = BrowsingContext.New(AngleSharp.Configuration.Default);
            using (var webClient = new WebClient())
            {
                var urlData = webClient.DownloadStringAwareOfEncoding(Url.Create(url));
                var document = await context.OpenAsync(req => req.Content(urlData));
                return document;
            }
        }

        [AutoMapTo(typeof(ArkMap))]
        public class ArkMapWithUrl
        {
            public string Name;
            public string Url;
            public List<ArkDinoTypeWithUrl> ArkDinoTypes = new List<ArkDinoTypeWithUrl>();

            public ArkMapWithUrl(string name, string url)
            {
                Name = name;
                Url = url;
            }
        }

        [AutoMapTo(typeof(ArkDinoType))]
        public class ArkDinoTypeWithUrl
        {
            public string Name;
            public string Url;
            public List<ArkDinoEntity> ArkDinoEntities = new List<ArkDinoEntity>();
            
            public ArkDinoTypeWithUrl(string name, string url)
            {
                Name = name;
                Url = url;
            }
        }
    }
}