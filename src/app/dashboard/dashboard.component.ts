import {Component, OnDestroy, OnInit} from '@angular/core';

import {Hero} from '../hero/hero';
import {HeroService} from '../_services/hero.service';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  private ngUnsubscribe: Subject<any> = new Subject();
  public heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private titleService: Title,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    /**
     * set browser title
     * this.translate is needed to extract with ngx-translate-extract
     */
    this.translate.get('COMPONENT_dashboard.plattform_title')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
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
