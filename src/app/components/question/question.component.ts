import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
 id : any;
 question:any;
 answers : any;

  constructor(private afAuth : AngularFireAuth, private router:Router, private firebaseService : FirebaseService, private route:ActivatedRoute) {
    if(this.afAuth.auth.currentUser === null ){
      this.router.navigate(['/']);
    }
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.firebaseService.getQuestionDetails(this.id).subscribe(question=>{
      this.question = question;
    })
  }

}
