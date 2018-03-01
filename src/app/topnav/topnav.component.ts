import { Component, OnInit } from '@angular/core';
import {LocalizeRouterService} from 'localize-router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  constructor(
    private localize: LocalizeRouterService
  ) { }

  ngOnInit() {
  }

  /**
   * set language
   * @param {string} lang
   */
  changeLanguage(lang: string) {
    this.localize.changeLanguage(lang);
  }
}
