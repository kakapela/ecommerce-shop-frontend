import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "./login-request-payload";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;
  // loginRequestPayload: LoginRequestPayload;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required)
    // });
    //
    // this.loginRequestPayload = {
    //   username: '',
    //   password: ''
    // };
  }

  // onLogin() {
  //
  //   console.log(this.loginForm.get('username')!.value);
  //   console.log(this.loginForm.get('password')!.value);
  //
  //   this.router.navigateByUrl('');
  // }
}
