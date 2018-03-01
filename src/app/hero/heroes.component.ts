import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

import {ToastrService} from 'ngx-toastr';

import {HeroService} from '../_services/hero.service';
import {Hero} from './hero';
import {LocalizeRouterService} from 'localize-router';

@Component({
  selector: 'app-my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  busy = true;
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService,
              private router: Router,
              private translate: TranslateService,
              private titleService: Title,
              private toastr: ToastrService,
              private localize: LocalizeRouterService) {

    /**
     * set browser title
     * this.translate is needed to extract with ngx-translate-extract
     */
    this.translate.get('COMPONENT_heroes.plattform_title').subscribe((res: string) => {
      titleService.setTitle(res);
    });
  }

  getHeroes(): Promise<Hero[]> {
    return this.heroService
      .getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }

  ngOnInit(): void {
    this.getHeroes()
      .then(
        () => this.busy = false
      );
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    const translatedPath: any = this.localize.translateRoute('/detail');
    this.router.navigate([translatedPath, this.selectedHero.id]);
  }
}
