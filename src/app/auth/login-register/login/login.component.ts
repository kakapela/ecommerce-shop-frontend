import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    this.submitted = true;

    if (loginForm.invalid) {
      return;
    }

    console.log('Username: ', loginForm.value.username);
    console.log('Password: ', loginForm.value.password);

  }
}
