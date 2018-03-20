import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../../_services/hero-search.service';
import {Hero} from '../hero';
import {LocalizeRouterService} from 'localize-router';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  public heroes: Observable<Hero[]>;
  public searchTerms = new Subject<string>();
  public searching = false;

  constructor(
    private heroSearchService: HeroSearchService
  ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searching = true;
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.heroSearchService.search(term)
          .finally(() => this.searching = false)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Hero[]>([])
          .finally(() => this.searching = false)
      )
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        this.searching = false;
        return Observable.of<Hero[]>([]);
      });
  }
}
