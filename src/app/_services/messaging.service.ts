import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

interface Message {
  channel: string;
  data: any;
}

@Injectable()
export class MessagingService {
  private message$: Subject<Message>;

  constructor() {
    this.message$ = new Subject<Message>();
  }

  public publish<T>(message: T): void {
    const channel = (<any>message.constructor).name;
    this.message$.next({channel: channel, data: message});
  }

  public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
    const channel = (<any>messageType).name;
    return this.message$.filter(m => m.channel === channel).map(m => m.data);
  }
}
