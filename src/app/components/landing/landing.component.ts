import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  user : Observable<firebase.User>;

  constructor(private afAuth : AngularFireAuth, private router : Router) {
    this.afAuth.auth.onAuthStateChanged((user)=>{
      this.user = this.afAuth.authState;
    })
    if(this.user) {
      this.router.navigate(['/home']);
    }
   }

  ngOnInit() {
  }

}
