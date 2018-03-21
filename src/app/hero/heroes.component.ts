import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

import {ToastrService} from 'ngx-toastr';

import {HeroService} from '../_services/hero.service';
import {Hero} from './hero';
import {LocalizeRouterService} from 'localize-router';
import {Subject} from 'rxjs/Subject';
import {BrowserTitleService} from '../_services/browser-title.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  public busy = true;
  public formBusy = false;
  public heroes: Hero[];
  public selectedHero: Hero;
  private browserTitleKey = 'COMPONENT_heroes.plattform_title';
  public heroForm: FormGroup;

  constructor(private heroService: HeroService,
              private router: Router,
              private translate: TranslateService,
              private titleService: BrowserTitleService,
              private toastr: ToastrService,
              private localize: LocalizeRouterService,
              private fb: FormBuilder) {
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
    this.createForm();
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

  get name() {
    return this.heroForm.get('name');
  }

  createForm() {
    this.heroForm = this.fb.group({
      name : new FormControl(
        '',
        {
          validators : [Validators.required],
          updateOn : 'submit'
        }
      )
    });
  }
  onSubmit(): void {
    if (!this.heroForm.valid) {
      // validate controls
      Object.keys(this.heroForm.controls).forEach(field => {
        const control = this.heroForm.get(field);
        control.markAsTouched({ onlySelf: true });
        return;
      });
    } else {
      this.formBusy = true;
      const name: string = this.heroForm.value.name.trim();
      this.heroService.create(name)
        .then(hero => {
          this.heroForm.reset();
          this.formBusy = false;
          this.heroes.push(hero);
          this.selectedHero = null;
        });
    }
  }
}
