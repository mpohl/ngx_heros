import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {LocalizeRouterService} from 'localize-router';
import 'rxjs/add/operator/takeUntil';
// import { takeUntil } from 'rxjs/operators'; // for rxjs ^5.5.0 lettable operators
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  public loginForm: FormGroup;

  public loading = false;
  public loginError = false;
  public nextUrl: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private localize: LocalizeRouterService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    this.createForm();
    this.route
      .queryParams
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.nextUrl = params['url'] || this.localize.translateRoute('/');
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  createForm() {
    this.loginForm = this.fb.group({
      username : new FormControl(
        '',
        {
          validators : [ Validators.required,  Validators.minLength(4)],
          updateOn : 'blur'
        }
      ),
      password : new FormControl(
        '', {
          validators : [ Validators.required ]
        }
      )
    });
  }

  onSubmit() {
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate([this.nextUrl]);
        } else {
          this.loginError = true;
          this.loading = false;
        }
      });
  }
}
