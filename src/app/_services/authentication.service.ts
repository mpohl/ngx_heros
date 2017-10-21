import {EventEmitter, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  public token: string;
  private apiUrl = environment.apiUrl;  // URL to web api
  public isAuthenticated = false;
  public authChanged = new EventEmitter<Object>(true);

  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.isAuthenticated = !isNullOrUndefined(this.token);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.apiUrl + '/authenticate', JSON.stringify({username: username, password: password}))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));

          this.isAuthenticated = true;

          // emit event
          this.authChanged.emit(this.isAuthenticated);

          // return true to indicate successful login
          return true;
        } else {
          this.isAuthenticated = false;
          // emit event
          this.authChanged.emit(this.isAuthenticated);
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.isAuthenticated = false;
    // emit event
    this.authChanged.emit(this.isAuthenticated);
  }
}
