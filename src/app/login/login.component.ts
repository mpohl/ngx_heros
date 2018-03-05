import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {LocalizeRouterService} from 'localize-router';

@Component({
  selector: 'app-login',
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public loading = false;
  public loginError = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private localize: LocalizeRouterService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    this.createForm();
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
        'test',
        {
          validators : [ Validators.required,  Validators.minLength(4)],
          updateOn : 'blur'
        }
      ),
      password : new FormControl(
        'test', {
          validators : [ Validators.required,  Validators.minLength(4)],
          updateOn : 'blur'
        }
      )
    });
  }

  onSubmit() {
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(result => {
        if (result === true) {
          const translatedPath: any = this.localize.translateRoute('/');
          this.router.navigate([translatedPath]);
        } else {
          this.loginError = true;
          this.loading = false;
        }
      });
  }
}
