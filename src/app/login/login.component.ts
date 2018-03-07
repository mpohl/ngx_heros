import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {LocalizeRouterService} from 'localize-router';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {BrowserTitleService} from '../_services/browser-title.service';

@Component({
  selector: 'app-login',
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  private browserTitleKey = 'COMPONENT_login.plattform_title';

  public loginForm: FormGroup;

  public loading = false;
  public loginError = false;
  public nextUrl: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private localize: LocalizeRouterService,
              private titleService: BrowserTitleService,
              private translate: TranslateService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    /**
     * set browser title
     */
    this.titleService.set(this.browserTitleKey);
    this.translate.onLangChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: LangChangeEvent) => {
        this.titleService.set(this.browserTitleKey);
    });
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
