import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getDataFromArea, getValueFromString } from './dataConcetration';
declare var H: any;
export let markerGroup: any;
let map: any;
let infoBubble: any;
let activeFilter: string = '';
let colors = [
  'rgba(150, 150, 150, 0.5)',
  'rgba(21, 180, 51, 0.5)',
  'rgba(255, 128, 0, 0.5)',
  'rgba(255, 24, 24, 0.5)',
];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, AfterViewInit {
  private platform: any;

  @ViewChild('map', {static: false})
  public mapElement: ElementRef;

  private behavior: any;
  private ui: any;
  private lineString = [];
  // private markerGroup: any;
  private coord: any;
  private hoveredObject: any;
  private readerLayer: any;

  public constructor() {
    this.platform = new H.service.Platform({
      'apikey': 'xJKylTpYNJK5wkUFWV-dSkdfnODpyrXyDaDPWYFrJl4'
    });
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers({
      lg: 'ru'
    });
    map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        center: {lat: 59.942009, lng: 30.314444},
        zoom: 13,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    window.addEventListener('resize', () => map.getViewPort().resize());
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    this.ui = H.ui.UI.createDefault(map, defaultLayers, 'ru-RU');

    markerGroup = new H.map.Group();
    map.addObject(markerGroup);

    infoBubble = new H.ui.InfoBubble({lat: 0, lng: 0}, {});
    infoBubble.addClass('info-bubble');
    infoBubble.close();
    this.ui.addBubble(infoBubble);

    this.load3Regions();
  }

  load3Regions() {
    function replaceColorIfHigher(origin: string, color1: string) {
      var oldColorIndex = colors.indexOf(origin);
      var newColorIndex = colors.indexOf(color1);
      if (newColorIndex > oldColorIndex) {
        return color1;
      } else {
        return origin;
      }
    }

    function isFiltered(name: any | string): boolean {
      var data = getDataFromArea(name);
      console.log(name, data);
      if (activeFilter == '') {
        var fields = Object.getOwnPropertyNames(data);
        let flag = false;
        fields.forEach(f => {
          if (f == 'name')
            return;
          if (getValueFromString(data[f]) != -1) {
            flag = true;
          }
        });
        return flag;
      } else {
        if (!data.hasOwnProperty(activeFilter))
          return false;
        const field = data[activeFilter];
        var value = getValueFromString(field);
        return value != -1;
      }
    }

    function setStyles(obj, name) {
      var data = getDataFromArea(name);
      let color = '';

      if (activeFilter == '') {
        Object.getOwnPropertyNames(data).forEach(f => {
          if (f == 'name')
            return;
          const field = data[f];
          var value = getValueFromString(field);
          if (value === -1) {
            color = replaceColorIfHigher(color, colors[0]);
          }
          if (value < 0.5) {
            color = replaceColorIfHigher(color, colors[1]);
          }
          if (value >= 0.5 && value <= 1) {
            color = replaceColorIfHigher(color, colors[2]);
          }
          if (value > 1) {
            color = replaceColorIfHigher(color, colors[3]);
          }
        });
      } else {
        var value = getValueFromString(data[activeFilter]);
        console.log(name, value);
        if (value === -1) {
          color = replaceColorIfHigher(color, colors[0]);
        }
        if (value < 0.5) {
          color = replaceColorIfHigher(color, colors[1]);
        }
        if (value >= 0.5 && value <= 1) {
          color = replaceColorIfHigher(color, colors[2]);
        }
        if (value > 1) {
          color = replaceColorIfHigher(color, colors[3]);
        }
      }
      obj.setStyle({
        fillColor: color,
        strokeColor: color,
        lineWidth: 3
      });
    }
    // AYB_9QI5TBigmCbHfLLUpwA
    let reader = new H.data.geojson.Reader(
      'https://xyz.api.here.com/hub/spaces/o3m7nRsU/iterate?access_token=AHlteDdKSXGDbfkphDbl5gA',
      {
        style: mapObject => {
          var obj = mapObject.getObjects()[0];
          var data = mapObject.getData();
          var name = data.properties.name;
          console.log('mapobj', name, data);
          if (name && name.includes('район')) {
            if (isFiltered(name)) {
              setStyles(obj, name);
              obj.setData({
                name: name
              });
              obj.addEventListener('pointerenter', this.eventPointer);
            } else {
              obj.setStyle({
                fillColor: colors[0],
                strokeColor: colors[0],
                lineWidth: 3
              });
            }
          } else {
            obj.setStyle({
              fillColor: 'rgba(0, 0, 0, 0)',
              strokeColor: 'rgba(0, 0, 0, 0)',
              lineWidth: 3
            });
          }
        }
      }
    );
    reader.parse();
    this.readerLayer = reader.getLayer();
    map.addLayer(this.readerLayer);
  }

  eventPointer(evt) {
    console.log('evPointer', evt);
    if (this.hoveredObject && this.hoveredObject !== evt.target) {
      infoBubble.close();
    }

    this.hoveredObject = evt.target;
    let pos = map.screenToGeo(
      evt.currentPointer.viewportX,
      evt.currentPointer.viewportY)
    infoBubble.setPosition(pos);


    const getData = getDataFromArea(evt.target.getData().name);
    let content = `
          <div class="info-bubble-label">
             ${getData.name} <br />
             <hr/>`;

    Object.getOwnPropertyNames(getData).forEach(f => {
      if (f == 'name')
        return;
      if ((activeFilter == '' || f == activeFilter && getValueFromString(getData[f]) != -1))
        content += `<div>${getData[f]}</div>`;
    });
    content += '</div>'
    infoBubble.setContent(content);
    infoBubble.open();
  }
  private clear(carbonOxide: string) {
    map.removeLayer(this.readerLayer);
    infoBubble.close();
    activeFilter = carbonOxide;
    this.load3Regions();
  }

  filter(s: string) {
    this.clear(s);
  }

  filterView() {
    switch (activeFilter) {
      case '':
        return 'Все';
      case 'carbonOxide':
        return 'Оксид углерода';
      case 'nitrogenOxide':
        return 'Оксид азота';
      case 'nitrogenDioxide':
        return 'Диоксид азота';
      case 'sulphurDioxide':
        return 'Диоксид серы';
      case 'ozon':
        return 'Озон';
      case 'pm10':
        return 'Частицы PM2.5';
      case 'pm25':
        return 'Частицы PM10';
    }
  }

  getColors() {
    return colors;
  }
}
