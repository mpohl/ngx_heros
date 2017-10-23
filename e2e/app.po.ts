import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
  getHeading1() {
    return element(by.css('h1')).getText();
  }

  getTitle() {
    return browser.getTitle();
  }
}
