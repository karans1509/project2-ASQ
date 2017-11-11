import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';
import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user : Observable<firebase.User>;
  photo : any;
  url : any;

  title : any;
  postedBy : any;
  category : any;
  currUser : firebase.User;
  
  constructor(public afAuth: AngularFireAuth, private router:Router, public flashMessage: FlashMessagesService, private current : ActivatedRoute, private firebaseService : FirebaseService, private popup : Popup) { 

    this.user = this.afAuth.authState;

    this.firebaseService.getPic().subscribe(message => {
      // console.log(message);
      this.photo = message.photo;
      console.log(this.photo);
    })
    
    if(this.afAuth.auth.currentUser === null ){
      // this.router.navigate(['/']);
    }
    else {
      this.postedBy = this.afAuth.auth.currentUser.displayName;
    }
    this.currUser = this.afAuth.auth.currentUser;

    this.afAuth.auth.onAuthStateChanged((user)=>{
      if(user != null) 
      this.postedBy = user.displayName;
      this.photo = user.photoURL;
      console.log(user.providerData);
    })
  }

  ngOnInit() {
    if(this.afAuth.auth.currentUser != null) {
      this.postedBy = this.afAuth.auth.currentUser.displayName;
      console.log(this.afAuth.auth.currentUser.providerData);
    }
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

  show() {
    this.popup.options = {
      cancleBtnClass: "btn btn-default", 
      confirmBtnClass: "btn btn-default",
      animationDuration : 1.5,
      confirmBtnContent : "Submit",
      cancleBtnContent : "Cancel",
      animation : 'fadeInUp',
      color: "#4180ab"}
      this.popup.show(this.popup.options);
  }

  onAddSubmit() {
    let question = {
      title : this.title,
      postedBy : this.postedBy,
      category : this.category,
      likes : 0,
      dislikes : 0,
      photo : this.photo
    }
    console.log("submitting");
    this.firebaseService.newQuestion(question);
    this.title = "";
    this.popup.hide();
    this.router.navigate(['questions']);
  }

}
