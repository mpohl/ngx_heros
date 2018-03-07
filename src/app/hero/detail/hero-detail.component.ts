import 'rxjs/add/operator/switchMap';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';

import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';

import {Hero} from '../hero';
import {HeroService} from '../../_services/hero.service';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  public hero: Hero;
  public busy = true;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location,
              private titleService: Title,
              private translate: TranslateService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    /**
     * set browser title
     * this.translate is needed to extract with ngx-translate-extract
     */
    this.translate.get('COMPONENT_detail.plattform_title')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: string) => {
      this.titleService.setTitle(res);
    });

    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(
        hero => {
          this.hero = hero;
          this.busy = false;
        },
        error => {
          console.error('Could not get Hero!');
          this.toastr.error( 'Held nicht gefunden...' , 'API Fehler!');
          this.busy = false;
        }
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
