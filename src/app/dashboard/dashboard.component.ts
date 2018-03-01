import {Component, OnInit} from '@angular/core';

import {Hero} from '../hero/hero';
import {HeroService} from '../_services/hero.service';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private titleService: Title,
    private translate: TranslateService
  ) {
    /**
     * set browser title
     * this.translate is needed to extract with ngx-translate-extract
     */
    this.translate.get('COMPONENT_dashboard.plattform_title').subscribe((res: string) => {
        titleService.setTitle(res);
      });
  }

  ngOnInit(): void {
    /**
     * get heroes and show best 4
     */
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
