import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from "../home/home";


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

    splash = true;

 @ViewChild('map') mapElement:ElementRef;
 map: any;

 constructor( private afAuth : AngularFireAuth, private toast: ToastController,
   public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {


  constructor( private afAuth : AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {

  }
  userPosition;


 ionViewDidLoad() {
  setTimeout(() => this.splash = false, 4000);
  
   this.initMap();
   this.findNani();
 
   console.log('ionViewDidLoad MainPage');
 }

 

 loadSideMenu(){
  this.afAuth.auth.signOut()  
  this.navCtrl.setRoot(HomePage)
   console.log("clicked");
 }

  

  initMap() {
    let x = this;
    this.geolocation.getCurrentPosition().then((position) => {
      // console.log(position)
      x.userPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
      console.log(x.userPosition)
      let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        mapTypeId: 'terrain'
      });
    })
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

 ////////////////////////////////////////////////

//  addpolyLine(){
     
//     let flightPlanCoordinates = [
//       {lat: 30.1866316, lng: 36.1376679 },
//       {lat: 28.1866316, lng: 31.1376679 },
//       {lat: 31.963158, lng: 35.930359 },
//       {lat: 28.9866316, lng: 31.8376679 },
//       {lat: 38.1866316, lng: 27.1376679 },
//       {lat: 23.1966316, lng: 31.1378679 }
//     ];
    
//     let flightPath = new google.maps.Polyline({
//       path: flightPlanCoordinates,
//       geodesic: true,
//       strokeColor: '#FF0000',
//       strokeOpacity: 1.0,
//       strokeWeight: 2
//     });

//     flightPath.setMap(this.map);
//   }


    showDirectionAndDuration(){
      //direction code
      let x = this;
      let markerArray = [];
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
      let stepDisplay = new google.maps.InfoWindow;
      this.calculateAndDisplayRoute( directionsDisplay, directionsService, markerArray, stepDisplay, this.map);
      var onChangeHandler = function() {
        x.calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, this.map);
      };
      document.getElementById('start').addEventListener('change', onChangeHandler);
      // document.getElementById('end').addEventListener('change', onChangeHandler);

      //duration code
      
      var bounds = new google.maps.LatLngBounds;
      // var destination = 'Yaser Mall';
      // var origin = 'Mecca Mall';
      // var origin = {lat: 31.977285, lng: 35.843623};
      // var destination = {lat: 31.955330, lng: 35.834616};
      // var origin = document.getElementById('start').value;
      var origin = {lat: 31.977285, lng: 35.843623};
      var destination = x.userPosition;
      var geocoder = new google.maps.Geocoder;
      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      },function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
              var originList = response.originAddresses;
              var destinationList = response.destinationAddresses;
              var outputDiv = document.getElementById('output');
              outputDiv.innerHTML = '';
              for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                console.log(results)
                for (var j = 0; j < results.length; j++) {
                outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                  ': ' + results[j].distance.text + ' in ' +
                  results[j].duration.text + '<br>';
                }
              }
            }
        });
    }

    calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map){
      let x = this;
      for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
      }
      directionsService.route({
        origin: {lat: 31.977285, lng: 35.843623},
        // origin: document.getElementById('start').value,
        destination: x.userPosition,
        travelMode: 'DRIVING'
      }, function(response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
          document.getElementById('warnings-panel').innerHTML =
              '<b>' + response.routes[0].warnings + '</b>';
          directionsDisplay.setDirections(response);
          x.showSteps(response, markerArray, stepDisplay, map);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    showSteps(directionResult, markerArray, stepDisplay, map){
      var myRoute = directionResult.routes[0].legs[0];
      for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        this.attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
      }
    }

    attachInstructionText(stepDisplay, marker, text, map){
      google.maps.event.addListener(marker, 'click', function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
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

    /////////////////////////////////////////////////////////

  findNani() {
    this.geolocation.getCurrentPosition().then(position => {
      let location = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      let result = {};
      let min = 0;
      let lat2 = position.coords.latitude;
      let lon2 = position.coords.longitude;
      let distance;
      for(var i=0; i<naniArr.length; i++){
        var R = 6371; // Radius of the earth in km
        var dLat = (Math.PI/180)*(lat2-naniArr[i].lat);  // deg2rad below
        var dLon = (Math.PI/180)*(lon2-naniArr[i].long); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos((Math.PI/180)*(naniArr[i].lat)) * Math.cos((Math.PI/180)*(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km

        console.log(naniArr[i].name,d)
        result[naniArr[i].name]=d;
      }
      let arrayKeys = Object.keys(result);
      let firstKey = arrayKeys[0];
      min = result[firstKey];
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