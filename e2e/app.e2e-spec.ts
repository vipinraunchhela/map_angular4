import { DummyNgPage } from './app.po';

describe('dummy-ng App', () => {
  let page: DummyNgPage;

  beforeEach(() => {
    page = new DummyNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
