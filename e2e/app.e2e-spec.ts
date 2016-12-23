import { Auth1Page } from './app.po';

describe('auth1 App', function() {
  let page: Auth1Page;

  beforeEach(() => {
    page = new Auth1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
