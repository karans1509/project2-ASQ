import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {NgxPaginationModule} from 'ngx-pagination';
import 'firebase/storage';

//import * as cloudinary from 'cloudinary-core';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import cloudinaryConfiguration from './config';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PopupModule } from 'ng2-opd-popup';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
 
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuestionComponent } from './components/question/question.component';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';

const appRoutes: Routes = [
  { path:'', component:LandingComponent },
  { path:'signup', component:SignupComponent },
  { path:'login', component:LoginComponent },
  { path:'questions', component:QuestionsComponent },
  { path:'home', component:HomeComponent },
  { path: 'post-question', component:PostQuestionComponent },
  { path: 'question/:id', component:QuestionComponent }
]

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    QuestionsComponent,
    NavbarComponent,
    QuestionComponent,
    PostQuestionComponent,
    LandingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlashMessagesModule,
    CloudinaryModule.forRoot(cloudinaryLib, { 

    cloud_name: 'karan-cloud',
    upload_preset : 'jtdgexna'}),
    Ng2SearchPipeModule,
    PopupModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatButtonToggleModule
  ],
  providers: [FirebaseService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
