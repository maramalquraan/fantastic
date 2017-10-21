import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { MainPage } from "../pages/main/main";
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    var config = {
      apiKey: "AIzaSyAUipRdjwgFm76lPfFCVWH84OWKSY5S32I",
      authDomain: "fantastic-13633.firebaseapp.com",
      databaseURL: "https://fantastic-13633.firebaseio.com",
      projectId: "fantastic-13633",
      storageBucket: "fantastic-13633.appspot.com",
      messagingSenderId: "1014964753035"
  };
    firebase.initializeApp(config);
    
        firebase.auth().onAuthStateChanged((user) => {
         if (user === null) {
           console.log("this should appear if the user is not logged in")
            // If there's no user logged in send him to the LoginPage
            this.rootPage = HomePage;
         } else {

          console.log("this should appear if the user is logged in",user)          
            // If there's a user take him to the home page.
            this.rootPage = MainPage;
          }
        });
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

