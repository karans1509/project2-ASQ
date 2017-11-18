import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class FirebaseService {

  question:Observable<AngularFireAction<firebase.database.DataSnapshot>>;
  questionsRef : Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  questions:any;
  
  answer:Observable<AngularFireAction<firebase.database.DataSnapshot>>;
  answersRef : Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  answers : any; 

  subj = new Subject<any>();
  subj2 = new Subject<any>();

  constructor(private db : AngularFireDatabase, private afAuth : AngularFireAuth) {
    this.questions = this.db.list('questions'); 
   }
  
  getQuestions(){
   this.questionsRef = this.db.list('questions').snapshotChanges();
   this.questions = this.db.list('questions');
   return this.questionsRef;
  }

  getQuestionDetails(id){
   this.question = this.db.object('/questions/'+id).snapshotChanges();
   return this.question;
  }

  newQuestion(question){
    this.questions = this.db.list("questions");
    this.questions.push(question);
  }

  getAnswers(){
    this.answersRef = this.db.list('answers').snapshotChanges();
    this.answers = this.db.list('answers');
    return this.answersRef;
  }

  newAnswers(answer){
    this.answers.push(answer);
  }

  updateLikes(key, increment) {
    this.questions.update(key , { likes : increment } );
  }

  updateDislikes(key, decrement) {
    this.questions.update(key , { dislikes : decrement } );
  }

  updateUpvotes(key, increment) {
    this.answers.update(key , { upvotes : increment } );
  }

  updateDownvotes(key, increment) {
    this.answers.update(key , { downvotes : increment } );
  }
  
  sendName(dname : string) {
       this.subj.next({ name : dname });
  }

  getName():Observable<any> {
    return this.subj.asObservable();
  }
  
  sendPic(dPic : string) {
      this.subj2.next({ photo : dPic});
  }

  getPic():Observable<any> {
    return this.subj2.asObservable();
  }
}

interface Question{
  id? : string;
  postedBy? : string; 
  title? : string;
}