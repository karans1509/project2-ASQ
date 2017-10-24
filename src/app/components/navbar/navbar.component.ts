import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user : Observable<firebase.User>;
  photo : any;
  url : any;
  
  constructor(public afAuth: AngularFireAuth, private router:Router, public flashMessage: FlashMessagesService, private current : ActivatedRoute, private firebaseService : FirebaseService) { 
    this.user = this.afAuth.authState;
    this.firebaseService.getPic().subscribe(message => {
      // console.log(message);
      this.photo = message.photo;
      console.log(this.photo);
    })
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
