import {Component, OnDestroy, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';
import {BrowserTitleService} from '../../_services/browser-title.service';

@Component({
  selector: 'app-submodule',
  templateUrl: './submodule.component.html',
  styleUrls: ['./submodule.component.scss']
})
export class SubmoduleComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  private browserTitleKey = 'COMPONENT_submodule.plattform_title';

  constructor(
    private titleService: BrowserTitleService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    /**
     * set browser title
     */
    this.titleService.set(this.browserTitleKey);
    this.translate.onLangChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: LangChangeEvent) => {
        this.titleService.set(this.browserTitleKey);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
