using System.Collections.Generic;
using Abp.Domain.Entities;

namespace Aqua.TestPlatform.Entities
{
    public class ArkMap: Entity
    {
        public string Name { get; set; }
        public virtual ICollection<ArkDinoType> ArkDinoTypes { get; set; }
    }
}