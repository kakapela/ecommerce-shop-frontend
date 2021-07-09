import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginRequestPayload} from "../login-register/login/login-request-payload";
import {Observable, throwError} from "rxjs";
import {LoginResponsePayload} from "../login-register/login/login-response.payload";
import {catchError, map, tap} from "rxjs/operators";
import {LogoutRequestPayload} from "../login-register/login/logout-request.payload";
import {RegisterRequestPayload} from "../login-register/register/register-request.payload";
import {CustomHttpResponse} from "./custom-http-response";
import {RefreshTokenPayload} from "./refresh-token-payload";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = environment.apiUrl;
  loggedIn = false;
  refreshTokenPayload: RefreshTokenPayload;
  jwtHelper = new JwtHelperService();
  authenticationToken: string;
  logoutRequestPayload: LogoutRequestPayload;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>(`${this.host}/api/auth/login`, loginRequestPayload)
      .pipe(map(data => {
        localStorage.setItem('authenticationToken', data.authenticationToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('refreshToken', data.refreshToken);
        this.loggedIn = true;
        return true;
      }));
  }

  signup(registerRequestPayload: RegisterRequestPayload): Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>(`${this.host}/api/auth/signup`, registerRequestPayload);
  }

  logout() {
    this.authenticationToken = null;
      console.log('to ja kacper!');
    if (this.getRefreshToken()) {
      console.log('mam refresh Tokena');
      this.logoutRequestPayload = {
        refreshToken: this.getRefreshToken()
      };
      console.log(this.logoutRequestPayload.refreshToken);
      this.http.post(`${this.host}/api/auth/logout`,this.logoutRequestPayload)
        .subscribe(()=> {
        });
      this.clearLocalStorage();

    }
    else {
      this.clearLocalStorage();
    }
    this.router.navigateByUrl('/login_register');
  }

  clearLocalStorage(){
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
  }

  refreshToken() {
    this.refreshTokenPayload = {
      refreshToken: this.getRefreshToken()
    };

    return this.http.post<LoginResponsePayload>(`${this.host}/api/auth/refreshtoken`, this.refreshTokenPayload)
      .pipe(tap(response => {
          localStorage.setItem('authenticationToken', response.authenticationToken);
          localStorage.setItem('username', response.username);
          localStorage.setItem('refreshToken', response.refreshToken);
          console.log('metoda refreshtoken(): tap')
        }),
        catchError(err=>{
          console.log('metoda refreshtoken(): catchError!')
          this.logout();

          return throwError(err);
        })
      );
  }

  getAuthenticationToken() {
    return localStorage.getItem('authenticationToken');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isUserLoggedIn(): boolean {
    this.authenticationToken = this.getAuthenticationToken();
    if(this.authenticationToken !== null && this.authenticationToken !== '') {
      if(this.jwtHelper.decodeToken(this.authenticationToken).sub != null || ''){
        return true;
      }
    }
    return false;
  }
  // public isUserLoggedIn(): boolean {
  //   this.authenticationToken = this.getAuthenticationToken();
  //   if (this.authenticationToken != null && this.authenticationToken !== '') {
  //     if (this.jwtHelper.decodeToken(this.authenticationToken).sub != null || '') {
  //       if (!this.jwtHelper.isTokenExpired(this.authenticationToken)) {
  //         return true;
  //       }
  //     }
  //   }
  //   // this.logout();
  //   return false;
  // }

}
