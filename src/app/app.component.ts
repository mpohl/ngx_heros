import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {DOCUMENT, Meta, Title} from '@angular/platform-browser';
import {AuthenticationService} from './_services/authentication.service';
import {Router} from '@angular/router';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {environment} from '../environments/environment';
import {LocalizeRouterService} from 'localize-router';
import {Subject} from 'rxjs/Subject';
import {BrowserTitleService} from './_services/browser-title.service';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  private browserTitleKey = 'COMPONENT_app.platform_title';
  public title = 'Tour of Heroes';
  public isCollapsed = true;
  public activeLang = '';
  public isAuthenticated = false;
  private keepaliveUrl = environment.apiUrl + '/keepalive';  // URL to web keepalive api

  constructor(private translate: TranslateService,
              private titleService: BrowserTitleService,
              private metaService: Meta,
              @Inject(DOCUMENT) private _document: any,
              private authenticationService: AuthenticationService,
              private router: Router,
              private idle: Idle,
              private keepalive: Keepalive,
              private localize: LocalizeRouterService) {
    /**
     * Set default lang
     * this language will be used as a fallback when a translation isn't found in the current language
     */
    // this.translate.setDefaultLang('en');
    /**
     * the lang to use, if the lang isn't available, it will use the current loader to get them
     */
    // this.translate.use('de');
    /**
     * get active lang from LocalizeRouterService
     * set html lang attribute
     */
    this.activeLang = this._document.documentElement.lang = this.localize.parser.currentLang;
  }

  ngOnInit() {
    /**
     * event onLangChanged
     * set html lang attribute
     * set active Language
     */
    this.translate.onLangChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: LangChangeEvent) => {
      this.activeLang = this._document.documentElement.lang = event.lang;
    });

    /**
     * set browser title
     */
    this.titleService.set(this.browserTitleKey);
    this.translate.onLangChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: LangChangeEvent) => {
        this.titleService.set(this.browserTitleKey);
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
      .takeUntil(this.ngUnsubscribe)
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          this.resetIdle();
        } else {
          this.idle.stop();
        }
      });

    /**
     * ng idle
     */
    // seconds with no action to start idle countdown
    this.idle.setIdle(600);
    // countdown after idle
    this.idle.setTimeout(20);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
      const translatedPath: any = this.localize.translateRoute('/login');
      this.router.navigate([translatedPath]);
    });

    // sets the keepalive ping interval to 15 seconds
    this.keepalive.interval(15);
    // keepalive backend endpoint
    this.keepalive.request(this.keepaliveUrl);

    // start Idle checking
    if (this.isAuthenticated) {
      this.resetIdle();
    }

    /**
     * set browser descr
     * this.translate is needed to extract with ngx-translate-extract
     */
    this.translate.get('COMPONENT_app.platform_description')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: string) => {
      this.metaService.addTag({
        name: 'description',
        content: res
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  resetIdle() {
    this.idle.watch();
  }
}
