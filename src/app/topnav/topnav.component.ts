import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {LocalizeRouterService} from 'localize-router';
import {DOCUMENT} from '@angular/platform-browser';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Idle} from '@ng-idle/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  public activeLang = '';
  public isAuthenticated = false;
  public idleState = '';
  public idleCountdown = 0;

  constructor(
    private localize: LocalizeRouterService,
    @Inject(DOCUMENT) private _document: any,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private idle: Idle,
    private router: Router
  ) {}

  ngOnInit() {
    /**
     * get active lang from LocalizeRouterService
     * set html lang attribute
     */
    this.activeLang =  this.localize.parser.currentLang;

    /**
     * event onLangChanged
     * set active Language
     */
    /*
    this.translate.onLangChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: LangChangeEvent) => {
      this.activeLang  = event.lang;
    });
    */
    /**
     * status of auth of current user
     * @type {boolean}
     */
    this.isAuthenticated = this.authenticationService.isAuthenticated;
    /**
     * subscribe to auth change event
     */
    this.authenticationService
      .authChanged
      .takeUntil(this.ngUnsubscribe)
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        this.idleCountdown = 0;
      });

    this.idle.onIdleEnd
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
      this.idleCountdown = 0;
    });

    this.idle.onTimeoutWarning
      .takeUntil(this.ngUnsubscribe)
      .subscribe((countdown) => {
      this.idleCountdown = countdown;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate([this.localize.translateRoute('/dashboad')]);
  }

  /**
   * set language
   * @param {string} lang
   */
  changeLanguage(lang: string) {
    this.localize.changeLanguage(lang);
  }
}
