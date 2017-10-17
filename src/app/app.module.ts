import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth"

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from "../pages/sign-up/sign-up";
import {MainPage} from "../pages/main/main";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    MainPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyC6hAjtXhxf1VZwsIJkNyJRj7fb7NK_Qas",
      authDomain: "fantastic-95f95.firebaseapp.com",
      databaseURL: "https://fantastic-95f95.firebaseio.com",
      projectId: "fantastic-95f95",
      storageBucket: "fantastic-95f95.appspot.com",
      messagingSenderId: "420995755079"
    }),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
