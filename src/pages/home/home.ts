import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from "../sign-up/sign-up";
import { MainPage } from "../main/main";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  loadSignUp() {
    this.navCtrl.push(SignUpPage);
  }
  loadMainPage(){
    this.navCtrl.push(MainPage);
  }
}
