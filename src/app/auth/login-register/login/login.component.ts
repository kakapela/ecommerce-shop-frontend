import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../../shared/notification.service";
import {NotificationType} from "../../../enum/notification-type";
import {AuthService} from "../../shared/auth.service";
import {LoginRequestPayload} from "./login-request-payload";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  showLoading = false;
  loginRequestPayload: LoginRequestPayload;

  constructor(private authService: AuthService , private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    this.submitted = true;
    this.showLoading = true;

    if (loginForm.invalid) {
      this.showLoading = false;
      return;
    }

    this.loginRequestPayload = {
      username: loginForm.value.username,
      password: loginForm.value.password
    };

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.showLoading = false;
      this.submitted = false;
      this.router.navigateByUrl('/products');
      this.notificationService.notify(NotificationType.SUCCESS, 'Logowanie zakończyło się pomyślnie!');
      },errorResponse => {
        this.showLoading = false;
        this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }
}
