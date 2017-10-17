import { Component, OnInit } from '@angular/core';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var google;

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {
  public map;

  text: string;

  constructor() {
    console.log('Hello MapComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){
    this.map=this.createMap();
  }
    createMap(location=new google.maps.LatLng(48.712784, -74.005941)){
      let mapOptions={
        center:location,
        zoom: 15,
        myTypeId: google.maps.mapTypeId.ROADMAP,
        disableDefaultUI: true,
    }
    let mapElement= document.getElementById('map');
    let map = new google.maps.Map(mapElement, mapOptions);

    return map;
}

}
