using System.Collections.Generic;
using Abp.Domain.Entities;

namespace Aqua.TestPlatform.Entities
{
    public class ArkDinoType: Entity
    {
        public string Name { get; set; }
        public virtual ICollection<ArkDinoEntity> ArkDinoEntities { get; set; }
    }
}