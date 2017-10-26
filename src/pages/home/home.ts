import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from "../sign-up/sign-up";
import { MainPage } from "../main/main";
import { User } from "../../models/user"
import { AngularFireAuth } from "angularfire2/auth"
import { AngularFireDatabase } from "angularfire2/database";
import firebase from 'firebase';
// import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  splash = true;
  

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

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }
  login(user: User) {
    console.log("debuggg",user)
    // if(Error){
    //   alert(Error)
    // }
      let x = this
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(function () {
        var Uuser = x.afAuth.auth.currentUser;
        console.log("user", Uuser.emailVerified,"sign in" )
        if (Uuser.emailVerified) {
          console.log('omg ok')
          x.navCtrl.push(MainPage)
        } else {
          alert("you are not vertified please go to you email"+ user.email +"to vertify you account")
        }
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("we are inside login error ")
        alert(errorMessage)
      });
  }

  loginWithFB(){
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(()=>{
      firebase.auth().getRedirectResult().then((result)=>{
        alert(JSON.stringify(result));
      }).catch(function(error){
        alert(JSON.stringify(error))
      });
    })
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
  loadMainPage() {
    this.navCtrl.push(MainPage);
  }
}
