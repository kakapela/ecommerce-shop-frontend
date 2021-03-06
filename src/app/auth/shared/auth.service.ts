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
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = environment.apiUrl;
  loggedIn = false;
  refreshTokenPayload: RefreshTokenPayload;
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

    if (this.getRefreshToken()) {
      this.logoutRequestPayload = {
        refreshToken: this.getRefreshToken()
      };
      this.http.post(`${this.host}/api/auth/logout`, this.logoutRequestPayload).subscribe();

    }

    this.clearLocalStorage();
    this.router.navigateByUrl('/login_register');
  }

  clearLocalStorage() {
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
        }),
        catchError(err => {
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
    return this.authenticationToken !== null && this.authenticationToken !== '';
  }
}
