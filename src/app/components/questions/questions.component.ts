import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
// import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions:any;

  constructor(private firebaseService : FirebaseService, private afAuth: AngularFireAuth, private router: Router) { 
    // if(this.afAuth.auth.currentUser === null) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.firebaseService.getQuestions().subscribe(questions => {
      this.questions = questions;
      // console.log(questions.keys[0]);
    })
  }
}
