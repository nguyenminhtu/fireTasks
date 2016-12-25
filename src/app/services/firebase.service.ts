import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseAuth} from 'angularfire2';
import { Task } from '../../Task';

import 'rxjs/add/operator/map';
import 'rxjs/operator/first';
import {Router} from "@angular/router";

@Injectable()
export class FirebaseService {
  tasks: FirebaseListObservable<any[]>;
  isAuth: boolean = false;

  constructor(private af: AngularFire, private auth: FirebaseAuth, private router: Router) { }

  getTasks() {
    if(window.localStorage.getItem('userId')) {
      var id = window.localStorage.getItem('userId');
      return this.tasks = this.af.database.list('/tasks', {
        query: {
          orderByChild: 'userId',
          equalTo: id
        }
      }) as
          FirebaseListObservable<Task[]>
    }
  }

  userLogin(user: any) {
    this.af.auth.login(user)
        .then(state => {
          if(state.provider === 4) {
            window.localStorage.setItem('currentUser', state.auth.email);
            window.localStorage.setItem('userId', state.uid);
            this.router.navigate(['/home']);
          }
        })
        .catch(error => {
          window.localStorage.setItem('error-login', error.message);
        });
  }

  userSignup(user: any) {
    this.af.auth.createUser(user)
        .then(state => {
            if(state.provider === 4) {
            window.localStorage.setItem('currentUser', state.auth.email);
            window.localStorage.setItem('userId', state.uid);
            this.router.navigate(['/home']);
          }
        })
        .catch(error => {
          window.localStorage.setItem('error-signup', error.message);
        });
  }

  userLogout() {
    this.auth.logout();
  }

  isAuthenticated() {
    this.auth.subscribe(user => {
      if(user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
    return this.isAuth;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(id) {
    this.tasks.remove(id);
  }

  updateTask(id, task) {
    this.tasks.update(id, task);
  }

}
