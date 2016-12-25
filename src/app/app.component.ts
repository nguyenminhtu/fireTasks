import {Component, OnInit, Inject} from '@angular/core';
import {FirebaseService} from "./services/firebase.service";
import {Router} from "@angular/router";
import {FirebaseAuth} from "angularfire2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  emailUser: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router, @Inject(FirebaseAuth) public auth: FirebaseAuth) {
    this.auth.subscribe(user => {
      if(user) {
        this.emailUser = user.auth.email;
      }
    });
  }

  ngOnInit() {
  }

  onLogout() {
    this.firebaseService.userLogout();
    window.localStorage.removeItem('currentUser');
    window.localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
