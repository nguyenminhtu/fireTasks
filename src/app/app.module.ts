import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import {FirebaseService} from "./services/firebase.service";
import {routing} from "./app.routing";
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AuthGuard} from "./services/auth.guard";
import {ToastModule} from 'ng2-toastr/ng2-toastr';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBs9paEUu6IWQBPhtf-21EFDCtS5Iw1pPM",
  authDomain: "todosapp-61026.firebaseapp.com",
  databaseURL: "https://todosapp-61026.firebaseio.com",
  storageBucket: "todosapp-61026.appspot.com"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
  scope: ['email']
}

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    ToastModule
  ],
  providers: [FirebaseService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
