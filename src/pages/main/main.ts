import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
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
   public navCtrl: NavController, public navParams: NavParams) {
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
}
