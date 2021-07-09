import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../auth/shared/auth.service";
import {NotificationService} from "../shared/notification.service";
import {NotificationType} from "../enum/notification-type";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if (this.authService.isUserLoggedIn()) return true;

    this.authService.logout();
    this.notificationService.notify(NotificationType.ERROR, `Ta strona wymaga logowania`);
    return false;
  }

}
