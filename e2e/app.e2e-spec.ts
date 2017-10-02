import { AppPage } from './app.po';

describe('my-sassy-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app.title in <h1>', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('Welcome to app!');
    expect(page.getHeading1()).toEqual('Tour of Heroes');
  });
});
