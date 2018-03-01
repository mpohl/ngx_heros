import {Component, Inject, OnInit} from '@angular/core';
import {LocalizeRouterService} from 'localize-router';
import {DOCUMENT} from '@angular/platform-browser';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Idle} from '@ng-idle/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

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
  ) {
    /**
     * get active lang from LocalizeRouterService
     * set html lang attribute
     */
    this.activeLang = this._document.documentElement.lang = localize.parser.currentLang;

    /**
     * event onLangChanged
     * set active Language
     */
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.activeLang  = event.lang;
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
        this.idleCountdown = 0;
      });

    idle.onIdleEnd.subscribe(() => {
      this.idleCountdown = 0;
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleCountdown = countdown;
    });
  }

  ngOnInit() {
  }

  /**
   * set language
   * @param {string} lang
   */
  changeLanguage(lang: string) {
    this.localize.changeLanguage(lang);
  }
}
