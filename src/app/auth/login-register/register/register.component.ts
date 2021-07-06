import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../shared/notification.service";
import {NotificationType} from "../../../enum/notification-type";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService, private notifier: NotifierService) {
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
    console.log(this.signupForm.get('username-signup').value);
    console.log(this.signupForm.get('email').value);
    console.log(this.signupForm.get('passwordGroup.password-signup').value);
    console.log(this.signupForm.get('passwordGroup.password-confirm').value);
    this.notificationService.notify(NotificationType.SUCCESS, 'Rejestracja zakończona! Link aktywacyjny został wysłany na Twój adres mailowy.');
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password-signup').value;
    const confirmPassword = group.get('password-confirm').value;
    return password === confirmPassword ? null : {notSame: true}
  }

}
