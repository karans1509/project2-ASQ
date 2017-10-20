import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user : firebase.User;
  first : string;
  last : string;
  image : string;
  picUrl: string;
  email:string;
  password: string;
  errorMessage : any;

  constructor(public afAuth: AngularFireAuth, private router:Router, 
    public flashMessage: FlashMessagesService, private firebaseService : FirebaseService) { 
    this.user = afAuth.auth.currentUser;
  }

  ngOnInit() {
    if(this.afAuth.auth.currentUser != null ){
      this.router.navigate(['/home']);
    }
  }


  signMeUp(){
    this.errorMessage = "";
    if(this.email && this.password && this.first && this.last) {
      this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password).then(value =>{
        let url = document.getElementById('profile');
        this.afAuth.auth.currentUser.updateProfile({
          displayName: this.first + ' ' + this.last ,
          photoURL : url.textContent
        }).catch(()=>{
          console.log('some error');  
        })
        this.afAuth.auth.onAuthStateChanged((user)=>{
          this.user = user;
          console.log(this.user);
        })
        
        console.log(this.user);
        this.router.navigate(['home']);
      }).catch(function(error) {
        console.log("Something went wrong!" );
        alert(error.message);
        console.log(error.message);
      })
    }
    else if( this.first == null || this.last == null ) {
      this.flashMessage.show("Please enter first and/or last name", {cssClass: 'alert-danger', timeOut : 3000});
    }
    else if( this.email == null || this.password == null || this.email === "" || this.password === "") {
      this.flashMessage.show("Please enter email and/or address", {cssClass: 'alert-danger', timeOut : 3000});
    }
   
  }

}
