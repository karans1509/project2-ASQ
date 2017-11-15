import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profilePic?: string;
  name: string;
  user: Observable<firebase.User>;
  currUser: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private firebaseService: FirebaseService) {

    this.user = this.afAuth.authState;

    this.firebaseService.getName().subscribe(message => {
      this.name = message.name;
    });
    this.firebaseService.getPic().subscribe(message => {
      this.profilePic = message.photo;
    })

    this.afAuth.auth.onAuthStateChanged((user)=>{
      if(user != null)  {
        this.name = user.displayName;
        console.log(this.name);
        this.profilePic = user.photoURL;
      }
    })
  }

  ngOnInit() {
    if (this.afAuth.auth.currentUser != null) {
      this.profilePic = this.afAuth.auth.currentUser.photoURL;
      this.name = this.afAuth.auth.currentUser.displayName;
    }
  }

}
