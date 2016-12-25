import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import {Task} from "../../Task";
import 'rxjs/add/operator/map';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  userId: string;
  newTask: string;
  appState: string = 'default';
  activeKey: string;
  editText: string;

  constructor(private firebaseService: FirebaseService, public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
    if(window.localStorage.getItem('userId')) {
      this.userId = window.localStorage.getItem('userId');
    }
    if(window.localStorage.getItem('error-signup')) {
      window.localStorage.removeItem('error-signup');
    }
    if(window.localStorage.getItem('error-login')) {
      window.localStorage.removeItem('error-login');
    }
  }

  ngOnInit() {
    this.firebaseService.getTasks()
        .subscribe(tasks => {
          this.tasks = tasks.reverse();
      })
  }

  addTask() {
    var task = {
      userId: this.userId,
      text: this.newTask,
      isCompleted: false,
      created_at: Date.now().toString()
    };

    this.firebaseService.addTask(task);
    this.toastr.success('Task added!', 'Success!');
    this.newTask = '';
  }

  removeTask(taskId) {
    this.firebaseService.removeTask(taskId);
    this.toastr.success('Task removed!', 'Success!');
  }

  changeState(state, key) {
    if(key) {
      this.activeKey = key;
    }
    this.appState = state;
  }

  update(event) {
    if(event.charCode === 13) {
      this.updateTask();
    }
  }

  showEdit(task) {
    this.changeState('edit', task.$key);
    this.editText = task.text;
  }

  updateTask() {
    var updTask = {
      text: this.editText
    };
    this.firebaseService.updateTask(this.activeKey, updTask);
    this.changeState('default', null);
    this.toastr.success('Task updated!', 'Success!');
  }

}
