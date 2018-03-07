import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Subject} from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  public users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // get users from secure api end point
    this.userService.getUsers()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(users => {
        this.users = users;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
