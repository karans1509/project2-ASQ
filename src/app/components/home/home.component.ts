import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profilePic? : string;
  name : string;
  user : firebase.User;
  currUser : Observable<firebase.User>;

  constructor(private afAuth : AngularFireAuth, private firebaseService : FirebaseService) { 
    this.currUser = this.afAuth.authState;
     this.firebaseService.getName().subscribe(message => { 
      //  console.log(message);
       this.name = message.name; 
      });
      this.firebaseService.getPic().subscribe(message => {
        // console.log(message);
        this.profilePic = message.photo;
      })

   this.afAuth.auth.onAuthStateChanged(function(user){
        this.name = user.displayName;
        this.profilePic = user.photoURL;
        console.log(this.name);
      })
  }

  ngOnInit() {
    this.profilePic = this.afAuth.auth.currentUser.photoURL;
    // console.log(this.profilePic);
    this.name = this.afAuth.auth.currentUser.displayName;
    // console.log(this.name);

  }

}
