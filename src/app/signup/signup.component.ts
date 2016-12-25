import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import {ToastsManager, Toast} from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;

  constructor(private firebaseService: FirebaseService, public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
    if(window.localStorage.getItem('error-login')) {
      window.localStorage.removeItem('error-login');
    }
  }

  ngOnInit() {
  }

  onSignup() {
    var user = {
      email: this.email,
      password: this.password
    };

    this.firebaseService.userSignup(user);
    this.checkErr();
  }

  checkErr() {
    if(window.localStorage.getItem('error-signup')) {
      this.toastr.error(window.localStorage.getItem('error-signup') +' Try another email!', 'Error!');
    }
  }

}
