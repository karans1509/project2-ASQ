import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../../services/firebase.service';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit {
  title : any;
  postedBy : any;
  category : any;
  user : firebase.User;

  constructor( private afAuth : AngularFireAuth, private router : Router, 
               private firebaseService:FirebaseService) { 
    if(this.afAuth.auth.currentUser === null ){
      // this.router.navigate(['/']);
    }
    else {
      this.postedBy = this.afAuth.auth.currentUser.displayName;
    }
    this.user = this.afAuth.auth.currentUser;
    // console.log(this.user)
  }

  ngOnInit() {
  }

  onAddSubmit() {
    let question = {
      title : this.title,
      postedBy : this.postedBy,
      category : this.category,
      likes : 0,
      dislikes : 0,
      photo : this.user.photoURL
    }
    this.firebaseService.newQuestion(question);
    this.router.navigate(['questions']);
  }

}
