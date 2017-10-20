import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profilePic : string;
  name : string;
  user : firebase.User;

  constructor(private afAuth : AngularFireAuth) { 
    this.profilePic = this.afAuth.auth.currentUser.photoURL;
    console.log(this.profilePic);
    this.name = this.afAuth.auth.currentUser.displayName;
    console.log(this.name);
  }

  ngOnInit() {
    this.profilePic = this.afAuth.auth.currentUser.photoURL;
    console.log(this.profilePic);
    this.name = this.afAuth.auth.currentUser.displayName;
    console.log(this.name);
  }

}
