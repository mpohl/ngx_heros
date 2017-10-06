import {Component} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private translate: TranslateService,
              private titleService: Title,
              private metaService: Meta) {
    /**
     * Set default lang
     * this language will be used as a fallback when a translation isn't found in the current language
     */
    translate.setDefaultLang('en');

    /**
     * the lang to use, if the lang isn't available, it will use the current loader to get them
     */
    translate.use('en').subscribe((res: string) => {
      /*
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        console.log('onLangChange', event);
      });
      */
    });

    /**
     * set browser title
     * this.translate is needed to extract with ngx-translate-extract
     */
    this.translate.get('app.platform_title').subscribe((res: string) => {
      titleService.setTitle(res);
    });

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
}
