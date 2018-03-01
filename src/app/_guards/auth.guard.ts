import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {LocalizeRouterService} from 'localize-router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localize: LocalizeRouterService) {
  }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    const translatedPath: any = this.localize.translateRoute('/login');
    this.router.navigate([translatedPath]);
    return false;
  }
}
