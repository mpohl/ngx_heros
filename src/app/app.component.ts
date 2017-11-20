import {Component, Inject} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {DOCUMENT, Meta, Title} from '@angular/platform-browser';
import {AuthenticationService} from './_services/authentication.service';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';

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

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(private translate: TranslateService,
              private titleService: Title,
              private metaService: Meta,
              @Inject(DOCUMENT) private _document: any,
              private authenticationService: AuthenticationService,
              private idle: Idle) {

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
      });

    /**
     * ng idle
     */

    // sets an idle timeout of 60 seconds
    idle.setIdle(60);
    // sets a timeout period of 4 minutes. after 5 minutes of inactivity, the user will be considered timed out.
    idle.setTimeout(240);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    this.reset();

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

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  /**
   * set language
   * @param {string} language
   */
  setLanguage(language: string) {
    this.translate.use(language);
  }
}
