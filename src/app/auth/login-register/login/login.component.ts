import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../../shared/notification.service";
import {NotificationType} from "../../../enum/notification-type";
import {AuthService} from "../../shared/auth.service";
import {LoginRequestPayload} from "./login-request-payload";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginRequestPayload: LoginRequestPayload;

  constructor(private authService: AuthService ,private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    this.submitted = true;

    if (loginForm.invalid) {
      return;
    }

    this.loginRequestPayload = {
      username: loginForm.value.username,
      password: loginForm.value.password
    };

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.notificationService.notify(NotificationType.SUCCESS, 'Logowanie zakończyło się pomyślnie!');


    },error => {
        this.notificationService.notify(NotificationType.ERROR, 'Błąd w trakcie logowania!');

    }
    );

    console.log('Username: ', this.loginRequestPayload.username);
    console.log('Password: ', this.loginRequestPayload.password);
  }
}
