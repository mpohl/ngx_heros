import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title, Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  param = {value: 'world'};

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    private metaService: Meta
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
  // switch language
  setLanguage(language: string) {
    this.translate.use(language);
  }
}
