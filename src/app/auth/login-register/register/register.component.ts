import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../shared/notification.service";
import {NotificationType} from "../../../enum/notification-type";
import {RegisterRequestPayload} from "./register-request.payload";
import {AuthService} from "../../shared/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
// TODO - show loading zamiast submitted i bajo
  submitted = false;
  registerRequestPayload: RegisterRequestPayload;

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
              private authService: AuthService) {
  }

  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      'username-signup': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'passwordGroup': this.formBuilder.group({
        'password-signup': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        'password-confirm': ['', [Validators.required]]
      }, {validators: this.checkPasswords})
    });
  }

  onSignup() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.registerRequestPayload = {
      username: this.signupForm.get('username-signup').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('passwordGroup.password-signup').value,
      firstName: this.signupForm.get('firstName').value,
      lastName: this.signupForm.get('lastName').value
    };

    this.authService.signup(this.registerRequestPayload)
      .subscribe(data => {
        this.submitted = false;
        this.notificationService.notify(NotificationType.SUCCESS, 'Rejestracja zakończona! Link aktywacyjny został wysłany na Twój adres mailowy.');
         this.signupForm.reset();
      }, (errorResponse:HttpErrorResponse) => {
        this.notificationService.notify(NotificationType.ERROR,  JSON.parse(errorResponse.error).message);
        this.submitted = false;
      });

  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password-signup').value;
    const confirmPassword = group.get('password-confirm').value;
    return password === confirmPassword ? null : {notSame: true}
  }

}
