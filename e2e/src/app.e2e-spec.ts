import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Image Search Demo');
  });

  it('should display default search result', () => {
    page.getSearchResult().then((items) => {
      expect(items.length).toEqual(5);
    });
  });

  it('should display empty request message witout file', () => {
    page.selectMatOptionAtStart('8');
    expect(page.getMessages()).toContain('empty request');
  });

});

describe('search image successfully', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display search result with uploaded file', () => {
    page.uploadFile('../../src/assets/bag02.jpg');
    page.selectMatOptionChange('3');
    page.browserSleep(3000);
    page.getSearchResult().then((items) => {
      console.log(items);
      page.browserSleep(5000);
      // Mocking network calls is not supported yet
      // by Protractor for Angular 2+ applications.
      // expect(items.length).toEqual(5);
      expect(items.length).toEqual(0);
    });
  });

});
