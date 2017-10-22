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
let naniArr = [
  { name: "marwa", lat: 30.1866316, long: 36.1376679 },
  { name: "samya", lat: 28.1866316, long: 31.1376679 },
  // { name: "leen", lat: 31.963158, long: 35.930359 },
  { name: "sameera", lat: 28.9866316, long: 31.8376679 },
  { name: "asma", lat: 38.1866316, long: 27.1376679 },
  { name: "waed", lat: 23.1966316, long: 31.1378679 }
];

let position;

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
   this.findNani();
 
   console.log('ionViewDidLoad MainPage');
 }
 
 loadSideMenu(){
  this.afAuth.auth.signOut()  
  //  console.log("clicked");
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

    
  findNani() {
    this.geolocation.getCurrentPosition().then(position => {
      let location = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      let result = {};
      let min = 0;
      let userLat = position.coords.latitude;
      let userlong = position.coords.longitude;
      let distance;
      for(var i=0; i<naniArr.length; i++){
        distance= ((userLat-naniArr[i].lat)**2+(userlong-naniArr[i].long)**2)**0.5;
        result[naniArr[i].name]=distance;
      }
      let arrayKeys = Object.keys(result)
      let firstKey = arrayKeys[0]
      min = result[firstKey] 
      // console.log(arrayKeys,firstKey,min )     
      for(var key in result){
        if(result[key]<min){
          min = result[key];
        }
      }
      for(var key in result){
        if(result[key]===min){
          let name = key
        }
      }
      console.log(name, min);
    alert("The nearst nani:" + " " + name + " " + "It is" + " " + Math.floor(min*10)+ " km" +" "+ "far from you");
    });
  }

   
  }
