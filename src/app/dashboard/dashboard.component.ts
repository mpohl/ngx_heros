import {Component, OnDestroy, OnInit} from '@angular/core';

import {Hero} from '../hero/hero';
import {HeroService} from '../_services/hero.service';
import {Title} from '@angular/platform-browser';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';
import {BrowserTitleService} from '../_services/browser-title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  private browserTitleKey = 'COMPONENT_dashboard.plattform_title';
  public heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private titleService: BrowserTitleService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {

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
     * get heroes and show best 4
     */
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
