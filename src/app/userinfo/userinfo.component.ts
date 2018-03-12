import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagingService} from '../_services/messaging.service';
import {Subject} from 'rxjs/Subject';
import {TranslateService} from '@ngx-translate/core';


export class UserinfoMessage {
    constructor(public TranslationKey: string) { }
}

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  public message = '';
  public timeout = 5000;
  public TranslationKey: string;

  constructor(
    private userinfo: MessagingService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.userinfo.of(UserinfoMessage)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(message => {
        this.TranslationKey = message.TranslationKey;
        setTimeout(() => {
          this.TranslationKey = '';
        }, this.timeout);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
