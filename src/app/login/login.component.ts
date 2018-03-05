import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../_services/authentication.service';
import {LocalizeRouterService} from 'localize-router';

@Component({
  selector: 'app-login',
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {
    username : 'test',
    password : 'test'
  };
  loading = false;
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private localize: LocalizeRouterService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          const translatedPath: any = this.localize.translateRoute('/');
          this.router.navigate([translatedPath]);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
