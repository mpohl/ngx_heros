import {Component, Inject} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {DOCUMENT, Meta, Title} from '@angular/platform-browser';
import {AuthenticationService} from './_services/authentication.service';
import {Router} from '@angular/router';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Tour of Heroes';
  public isCollapsed = true;
  public activeLang = '';
  public isAuthenticated = false;
  public idleState = '';
  public idleCountdown = 0;
  private keepaliveUrl = environment.apiUrl + '/keepalive';  // URL to web keepalive api

  constructor(private translate: TranslateService,
              private titleService: Title,
              private metaService: Meta,
              @Inject(DOCUMENT) private _document: any,
              private authenticationService: AuthenticationService,
              private router: Router,
              private idle: Idle,
              private keepalive: Keepalive) {

    /**
     * Set default lang
     * this language will be used as a fallback when a translation isn't found in the current language
     */
    translate.setDefaultLang('en');

    /**
     * the lang to use, if the lang isn't available, it will use the current loader to get them
     */
    translate.use('de');

    /**
     * event onLangChanged
     * set html lang attribute
     * set active Language
     */
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.activeLang = this._document.documentElement.lang = event.lang;
    });

    /**
     * set browser title
     * this.translate is needed to extract with ngx-translate-extract
     */
    this.translate.get('app.platform_title').subscribe((res: string) => {
      titleService.setTitle(res);
    });

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
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          this.resetIdle();
        } else {
          this.idleState = '';
          this.idle.stop();
        }
      });

    /**
     * ng idle
     */
    // seconds with no action to start idle countdown
    idle.setIdle(600);
    // countdown after idle
    idle.setTimeout(30);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleCountdown = 0;
      this.idleState = '';
    });
    idle.onTimeout.subscribe(() => {
      this.router.navigate(['login']);
    });
    // idle.onIdleStart.subscribe(() => this.idleState = '');
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'in ' + countdown + ' seconds!';
      this.idleCountdown = countdown;
    });

    // sets the keepalive ping interval to 15 seconds
    keepalive.interval(15);
    // keepalive backend endpoint
    keepalive.request(this.keepaliveUrl);

    // start Idle checking
    if (this.isAuthenticated) {
      this.resetIdle();
    }

    /**
     * set browser descr
     * this.translate is needed to extract with ngx-translate-extract
     */
    this.translate.get('app.platform_description').subscribe((res: string) => {
      metaService.addTag({
        name: 'description',
        content: res
      });
    });
  }

  /**
   * set language
   * @param {string} language
   */
  setLanguage(language: string) {
    this.translate.use(language);
  }

  resetIdle() {
    this.idle.watch();
    this.idleState = '';
    this.idleCountdown = 0;
  }
}
