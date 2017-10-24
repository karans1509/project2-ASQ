import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
// import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions = [];

  constructor(private firebaseService : FirebaseService, private afAuth: AngularFireAuth, private router: Router) { 
    // if(this.afAuth.auth.currentUser === null) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.firebaseService.getQuestions().subscribe(questions => {
      for(let i = questions.length -1 ; i >= 0 ; i--) {
        let item = { id : '', postedBy : '' , title : '' , likes : 0 , dislikes : 0};
        item.id = questions[i].key;
        item.postedBy = questions[i].payload.val().postedBy;
        item.title = questions[i].payload.val().title;
        item.likes = questions[i].payload.val().likes;
        item.dislikes = questions[i].payload.val().dislikes;
        this.questions.push(item);
      }
    })
  }
}
