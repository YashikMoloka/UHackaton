import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ArkDinoEntity, ArkDinoGrabberServiceProxy, ArkDinoSchemeDto, ArkDinoType, ArkMap } from '@shared/service-proxies/service-proxies';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
class ArkNode {
  structure: any;
  type: 'map' | 'type' | 'entity';
  children?: ArkNode[];
}

@Component({
  selector: 'app-ark-index',
  templateUrl: './ark-index.component.html'
})
export class ArkIndexComponent {
  treeControl = new NestedTreeControl<ArkNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ArkNode>();

  model: Promise<ArkDinoSchemeDto>;

  constructor(private service: ArkDinoGrabberServiceProxy) {
    this.model = service.getScheme().toPromise();
    this.model.then(t => this.buildData(t));
  }

  hasChild = (_: number, node: ArkNode) => !!node.children && node.children.length > 0;

  viewNode(node: ArkNode) {
    switch (node.type) {
      case 'map':
        return (<ArkMap>node.structure).name;
      case 'type':
        return (<ArkDinoType>node.structure).name;
      case 'entity':
        const data = (<ArkDinoEntity>node.structure);
        return `Level: ${data.level}; X: ${data.x}; Y: ${data.y}`;
    }
  }

  private buildData(t: ArkDinoSchemeDto) {
    const data = [];
    t.arkMaps.forEach(map => {
      const item = new ArkNode();
      item.structure = map;
      item.type = 'map';
      item.children = [];
      map.arkDinoTypes.forEach(types => {
        const type = new ArkNode();
        type.type = 'type';
        type.structure = types;
        type.children = [];
        types.arkDinoEntities.forEach(entities => {
          const entity = new ArkNode();
          entity.type = 'entity';
          entity.structure = entities;

          type.children.push(entity);
        });

        item.children.push(type);
      });
      data.push(item);
    });

    this.dataSource.data = data;
  }
}
