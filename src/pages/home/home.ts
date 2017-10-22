import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from "../sign-up/sign-up";
import { MainPage } from "../main/main";
import { User } from "../../models/user"
import { AngularFireAuth } from "angularfire2/auth"
import { AngularFireDatabase } from "angularfire2/database";
// import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  user = {} as User;
  nani;

  constructor(public afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public db: AngularFireDatabase) {
     db.object('nani').valueChanges().subscribe(data => {
       console.log(data)
       this.nani = data;
     });
    // this.nani.snapshotChanges().subscribe(action => {
    //   // console.log(action.type);
    //   // console.log(action.key)
    //   console.log(action.payload.val())
    // });
  }
      

  login(user: User){
    console.log(this.nani)
    let x=this
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(function(){
      x.navCtrl.push(MainPage)
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode,errorMessage)
      alert(errorMessage)

    });
    this.afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("yaaaaaaay")
      }
    });
  }

  // async login (user: User){

  //   try {
      
  //   const results = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)

  //   if(Error){
  //     console.log(Error,ErrorEvent)
  //   }   
  //   if(results){
  //     console.log("current user",this.afAuth.auth.login() ,"sendpassrest", this.afAuth.auth.sendPasswordResetEmail,"custom token",this.afAuth.auth.signInWithCustomToken)
  //     // this.navCtrl.setRoot(MainPage)
  //   }
  //   }

  //   catch(e){
  //     // console.error(e)
  //   }
  // }
  loadSignUp() {
    this.navCtrl.push(SignUpPage);
  }
  loadMainPage(){
    this.navCtrl.push(MainPage);
  }
}
