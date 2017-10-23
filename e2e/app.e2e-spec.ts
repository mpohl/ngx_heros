import { AppPage } from './app.po';

describe('my-sassy-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display "Dashboard" in header.title', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('Welcome to app!');
    expect(page.getTitle()).toEqual('Dashboard');
  });
});
