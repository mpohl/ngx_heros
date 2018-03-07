import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BrowserTitleService implements OnDestroy{
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) { }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  set(key: string) {
    this.translate.get(key)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

}
