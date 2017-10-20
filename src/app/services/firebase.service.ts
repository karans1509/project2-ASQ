import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';

@Injectable()
export class FirebaseService {

  questions:Observable<Question[]>;
  question:Observable<Question>;
  itemsRef : any;
  name : string;
  profilePic : string;

  constructor(private db : AngularFireDatabase) {
   }
  
  getQuestions(){
   this.questions = this.db.list('questions').valueChanges() as Observable<Question[]>;
   this.itemsRef = this.db.list('questions');
   return this.questions;
  }

  getQuestionDetails(id){
   this.question = this.db.object('/questions/'+id).valueChanges() as Observable<Question>;
   return this.question;
  }

  newQuestion(question){
    this.itemsRef.push(question);
  }
}

interface Question{
  postedBy? : string; 
  title? : string;
}