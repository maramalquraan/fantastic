import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { Geolocation } from '@ionic-native/geolocation';

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

 constructor( private afAuth : AngularFireAuth, private toast: ToastController,
   public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {

 }

 ionViewDidLoad() {
   this.initMap();
 
   console.log('ionViewDidLoad MainPage');
 }
 
 loadSideMenu(){
   console.log("clicked");
 }
  
  initMap(){
       
     this.geolocation.getCurrentPosition().then((position) => {
 
       let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
       let mapOptions = {
         center: location,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
        // mapTypeId: google.maps.MapType.G_NORMAL_MAP

       }
 
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
     });
 
   }

 
 ionViewWillLoad(){
   this.afAuth.authState.subscribe(data => {
     if(data && data.email){
      this.toast.create({
        message: "welcome to Nany App, ${data.email}",
        duration: 2000
      }).present()       
     }else{
      this.toast.create({
        message: "welcome to Nany App, ${data.email}",
        duration: 2000
      }).present()  
     }

   });
 }

    addMarker(){
     
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
     
      let content = "<h4>Information..</h4>";        
     
      this.addInfoWindow(marker, content);
     
    }
   
    addInfoWindow(marker, content){
     
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
     
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
     
    }
   
  }
