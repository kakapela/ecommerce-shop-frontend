import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginRequestPayload} from "../login-register/login/login-request-payload";
import {Observable} from "rxjs";
import {LoginResponsePayload} from "../login-register/login/login-response.payload";
import {map} from "rxjs/operators";
import {LogoutRequestPayload} from "../login-register/login/logout-request.payload";
import {RegisterRequestPayload} from "../login-register/register/register-request.payload";
import {CustomHttpResponse} from "./custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = environment.apiUrl;
  loggedIn = false;

  constructor(private http: HttpClient) { }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean>{
    return this.http.post<LoginResponsePayload>(`${this.host}/api/auth/login`, loginRequestPayload)
      .pipe(map(data => {
        localStorage.setItem('authenticationToken', data.authenticationToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('refreshToken', data.refreshToken);
        this.loggedIn = true;
        return true;
      }));
  }

  signup(registerRequestPayload: RegisterRequestPayload): Observable<CustomHttpResponse>{
    return this.http.post<CustomHttpResponse>(`${this.host}/api/auth/signup`, registerRequestPayload);
  }

  logout(logoutRequestPayload: LogoutRequestPayload){
    this.http.post(`${this.host}/api/auth/logout`, logoutRequestPayload);
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
  }

  getAuthenticationToken(){
    return localStorage.getItem('authenticationToken');
  }
  getUsername(){
    return localStorage.getItem('username');
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
  // public isUserLoggedIn(): boolean {
  //   let token = this.getAuthenticationToken();
  //   if (this.token != null && this.token !== ''){
  //     if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
  //       if (!this.jwtHelper.isTokenExpired(this.token)) {
  //         this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
  //         return true;
  //       }
  //     }
  //   } else {
  //     this.logOut();
  //     return false;
  //   }
  // }
}
