import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  id : any;
  user : Observable<firebase.User>;
  answerKey = [];
  question:Question;
  answers = [];
  title : any;
  newAnswer : any;
  likes : any;
  dislikes : any;
  up = [];
  down = [];
  count = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;
  p : number = 1;

  constructor(private afAuth : AngularFireAuth, private router:Router, private firebaseService : FirebaseService, private route:ActivatedRoute) {
    // if(this.afAuth.auth.currentUser === null ){
    //   this.router.navigate(['/']);
    // }
    
      this.user = this.afAuth.authState;
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getQuestionDetails(this.id).subscribe(question=>{
      let item = { id : '', postedBy : '', title : '', likes : '', dislikes : '', photo : ''};
      item.id = question.key;
      item.postedBy = question.payload.val().postedBy;
      item.title = question.payload.val().title;
      item.likes = question.payload.val().likes;
      item.dislikes = question.payload.val().dislikes;
      item.photo = question.payload.val().photo;
      this.title = item.title;
      this.likes = item.likes;
      this.dislikes = item.dislikes;
      this.question = item;
    })
    
    this.firebaseService.getAnswers().subscribe(answers=>{
      this.answers = [];
      this.answerKey = [];
      this.up = [];
      this.down = [];
      for(let i = 0 ; i<answers.length ; i++) {
        if( answers[i].payload.val().title == this.id ) {
          let item = { answer : '', postedBy : '' , title : '', upvotes : 0 , downvotes : 0};
          this.answerKey.push(answers[i].key);
          item.answer = answers[i].payload.val().answer;
          item.postedBy = answers[i].payload.val().postedBy;
          item.title = answers[i].payload.val().title;
          item.upvotes = answers[i].payload.val().upvotes;
          item.downvotes = answers[i].payload.val().downvotes;
          this.up.push(item.upvotes);
          this.down.push(item.downvotes);
          this.answers.push(item);
        }
      }
    })
  }

  postAnswer() {
    let ans = { answer : this.newAnswer, postedBy : this.afAuth.auth.currentUser.displayName ,
    title : this.id, upvotes : 0, downvotes : 0 }
    this.firebaseService.newAnswers(ans);
    this.newAnswer = "";
    // this.router.navigate(['question/'+this.route.snapshot.params['id']]);
  }
  
  incrLikes() {
    this.count++;
    if(this.count % 2 != 0) {
      this.likes = this.likes + 1;
      this.firebaseService.updateLikes(this.id , this.likes);
    }
    else {
      this.likes = this.likes - 1;
      this.firebaseService.updateLikes(this.id , this.likes);
    }
  }
  
  decrLikes() {
    this.count2++;
    if(this.count2 % 2 != 0) {
      this.dislikes = this.dislikes - 1;
    }
    else {
      this.dislikes = this.dislikes + 1;
    }
    
    this.firebaseService.updateDislikes(this.id , this.dislikes);
  }

  incrVotes (index) {
    this.count3++;
    if(this.count3 %2 !=0) {
      this.up[index] = this.up[index] + 1;
    }
    else {
      this.up[index] = this.up[index] - 1;
    }
    this.firebaseService.updateUpvotes(this.answerKey[index], this.up[index]);
  }

  decrVotes (index) {
    this.count4++;
    if(this.count4 %2 != 0) {
      this.down[index] = this.down[index] - 1;
    }
    else {
      this.down[index] = this.down[index] + 1;
    }
    this.firebaseService.updateDownvotes(this.answerKey[index], this.down[index]);
  }
}

interface Question {
  id? : any,
  postedBy? : any,
  title?:any
}