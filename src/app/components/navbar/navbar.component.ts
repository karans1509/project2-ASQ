import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user : Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private router:Router, public flashMessage: FlashMessagesService, private current : ActivatedRoute) { 
    this.user = this.afAuth.authState;
    
  }

  ngOnInit() {
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
      console.log("Signed Out");
      this.flashMessage.show("You are logged out", {cssClass: 'alert-success', timeOut : 3000});
      this.router.navigate(['login']);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

}
