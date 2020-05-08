using System;
using System.Linq;
using Abp.Authorization;
using Aqua.TestPlatform.Ark.ArkDinoGrabber.Dto;
using Aqua.TestPlatform.Authorization;
using Aqua.TestPlatform.EntityFrameworkCore.Repositories;

namespace Aqua.TestPlatform.Ark.ArkDinoGrabber
{
    public class ArkDinoGrabberAppService: TestPlatformAppServiceBase
    {
        private Workers.ArkDinoGrabber _grabber;
        private ArkMapRepository _repository;

        public ArkDinoGrabberAppService(Workers.ArkDinoGrabber grabber,
            ArkMapRepository repository)
        {
            _grabber = grabber;
            _repository = repository;
        }
        
        public ArkDinoSchemeDto GetScheme()
        {
            return new ArkDinoSchemeDto()
            {
                ArkMaps = _repository.GetAll().ToList()
            };
        }

        // [AbpAuthorize(PermissionNames.Pages_Users)]
        public void Refresh(string adminPass)
        {
            if (adminPass == "6295")
                _grabber.Refresh();
            else
                throw new Exception("Not pass");
        }
    }
}