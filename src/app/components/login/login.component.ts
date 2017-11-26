import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : Observable<firebase.User>;
  email : string;
  password: string;

  constructor(public afAuth: AngularFireAuth, private router:Router, public flashMessage : FlashMessagesService, private firebaseService : FirebaseService) {
    this.afAuth.auth.onAuthStateChanged((user)=>{
      this.user = this.afAuth.authState;
    })
    if(this.user) {
      this.router.navigate(['/home']);
    }
   }

  ngOnInit() {
    
  }
  
  login(){
    if(this.email && this.password) {
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(value=>{
        this.router.navigate(['home']);
      })
      .catch(function(error){
        console.log(' ', error.message);
        alert(error.message);
      })
    }
    else {
      console.log("Enter email and password");
      this.flashMessage.show("Enter email and password ", {cssClass : 'alert-danger', timeOut: 3000});
    }
    
  }
}
