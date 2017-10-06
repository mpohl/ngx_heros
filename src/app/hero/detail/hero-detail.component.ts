import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';

import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';

import {Hero} from '../hero';
import {HeroService} from '../../_services/hero.service';


@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  busy = true;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location,
              private titleService: Title,
              private translate: TranslateService,
              private toastr: ToastrService) {
    /**
     * set browser title
     * this.translate is needed to extract with ngx-translate-extract
     */
    this.translate.get('detail.plattform_title').subscribe((res: string) => {
      titleService.setTitle(res);
    });
  }

  ngOnInit(): void {
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

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
