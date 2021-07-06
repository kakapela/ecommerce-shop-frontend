import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginRequestPayload} from "../login-register/login/login-request-payload";
import {Observable} from "rxjs";
import {LoginResponsePayload} from "../login-register/login/login-response.payload";
import {map} from "rxjs/operators";

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
}
