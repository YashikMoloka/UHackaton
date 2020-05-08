using Abp.Domain.Entities;

namespace Aqua.TestPlatform.Entities
{
    public class ArkDinoEntity: Entity
    {
        public int Level { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}