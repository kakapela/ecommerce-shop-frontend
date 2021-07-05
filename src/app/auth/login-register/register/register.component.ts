import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      'username-signup': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'passwordGroup': this.formBuilder.group({
        'password-signup': ['', [Validators.required]],
        'password-confirm': ['', [Validators.required]]
      }, { validators: this.checkPasswords })
    });
  }

  onSignup() {
    this.submitted = true;

    if(this.signupForm.invalid) {
      return;
    }
    console.log(this.signupForm.get('username-signup').value);
    console.log(this.signupForm.get('email').value);
    console.log(this.signupForm.get('passwordGroup.password-signup').value);
    console.log(this.signupForm.get('passwordGroup.password-confirm').value);
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password-signup').value;
    const confirmPassword = group.get('password-confirm').value;
    return password === confirmPassword ? null : {notSame: true}
  }

}
