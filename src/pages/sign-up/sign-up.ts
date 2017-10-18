import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user"
import { AngularFireAuth } from "angularfire2/auth"

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  user = {} as User;  
  constructor(public afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  async register (user:User ){
    console.log("join pressed")
    try {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
    console.log(result)
    }
    catch(e){
      console.error(e)
      alert(e.message)
    }
  }

}
