import {Component, OnInit} from '@angular/core';

import {Hero} from '../hero/hero';
import {HeroService} from '../_services/hero.service';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private titleService: Title,
    private translate: TranslateService
  ) {
      translate.get('dashboard.title').subscribe((res: string) => {
        titleService.setTitle(res);
      });
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
