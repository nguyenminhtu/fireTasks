import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import {ToastsManager, Toast} from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private firebaseService: FirebaseService, public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
    if(window.localStorage.getItem('error-signup')) {
      window.localStorage.removeItem('error-signup');
    }
  }

  ngOnInit() {}

  onSignin() {
    var user = {
      email: this.email,
      password: this.password
    };
    this.firebaseService.userLogin(user);
    if(window.localStorage.getItem('error-login')) {
      this.toastr.error(window.localStorage.getItem('error-login') +' Try again!', 'Error!');
    }
  }

}
