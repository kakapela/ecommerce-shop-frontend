import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from "../auth/shared/auth.service";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {LoginResponsePayload} from "../auth/login-register/login/login-response.payload";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/api/auth/login') || request.url.includes('/api/auth/signup')
      || request.url.includes('/api/auth/refreshtoken') || request.url.includes('/api/auth/logout') )
      return next.handle(request);

    const jwtToken = this.authService.getAuthenticationToken();

    if (jwtToken) {
      const httpRequest = this.addJwtTokenToHeader(request, jwtToken);

      return next.handle(httpRequest).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          const refreshToken = this.authService.getRefreshToken();
          if(!refreshToken || refreshToken ==='') {
            this.authService.logout();
            return throwError(error);
          }
          return this.handleAuthErrors(httpRequest, next);
        }
        else {
          return throwError(error);
        }
      }));
    }

    return next.handle(request);
  }

  handleAuthErrors(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>>  {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken()
        .pipe(
          switchMap(
            (refreshTokenResponse: LoginResponsePayload) => {
              this.isTokenRefreshing = false;
              this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
              return next.handle(this.addJwtTokenToHeader(request, refreshTokenResponse.authenticationToken));
            }
          )
        );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => {
          return next.handle(this.addJwtTokenToHeader(request, this.authService.getAuthenticationToken()))
        }));
    }
  }


  addJwtTokenToHeader(httpRequest: HttpRequest<any>, jwtToken: string) {
    return httpRequest.clone({
      setHeaders: {Authorization: `Bearer ${jwtToken}`}
    });
  }

}
