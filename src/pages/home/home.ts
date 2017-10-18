import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from "../sign-up/sign-up";
import { MainPage } from "../main/main";
import { User } from "../../models/user"
import { AngularFireAuth } from "angularfire2/auth"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  user = {} as User;
  constructor(public afAuth: AngularFireAuth,
    public navCtrl: NavController) {

  }
  async login (user: User){
    console.log("log in pressed")
    try {
    const results = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    console.log(results)
    if(results){
      this.navCtrl.setRoot(MainPage)
    }
    }
    catch(e){
      console.error(e)
    }
  }
  loadSignUp() {
    this.navCtrl.push(SignUpPage);
  }
  loadMainPage(){
    this.navCtrl.push(MainPage);
  }
}
