import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

import {ToastrService} from 'ngx-toastr';

import {HeroService} from '../_services/hero.service';
import {Hero} from './hero';
import {LocalizeRouterService} from 'localize-router';
import {Subject} from 'rxjs/Subject';
import {BrowserTitleService} from '../_services/browser-title.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  public busy = true;
  public heroes: Hero[];
  public selectedHero: Hero;
  private browserTitleKey = 'COMPONENT_heroes.plattform_title';

  constructor(private heroService: HeroService,
              private router: Router,
              private translate: TranslateService,
              private titleService: BrowserTitleService,
              private toastr: ToastrService,
              private localize: LocalizeRouterService) {
  }

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

    this.getHeroes()
      .then(
        () => this.busy = false
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    const translatedPath: any = this.localize.translateRoute('/detail');
    this.router.navigate([translatedPath, this.selectedHero.id]);
  }
}
