import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  @ViewChild('map') mapElement:ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad MainPage');
  }
  
  loadSideMenu(){
    console.log("clicked")
  }

  initMap(){
    let location= new google.maps.LatLng(-34.9290, 138.6010);
    let mapOptions = {
      center: location,
      zoom:15,
      // mapTypeId: google.maps.mapTypeId.ROADMAP
      // mapTypeId: google.maps.MapType.G_NORMAL_MAP
    };
    this.map=new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
