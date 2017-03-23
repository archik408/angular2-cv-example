import { browser, element, by } from 'protractor';

describe('ng2-webcam app example', function () {

  beforeAll(function () {
    browser.get('/');
  });

  describe('ng2-webcam', function () {

    it('should display title "ng2-webcam test example"', function () {
      expect(browser.getTitle()).toEqual('ng2-webcam test example');
    });

    it('should render #ng2-webcam container', function () {
      const e = element(by.id('ng2-webcam'));
      expect(e).toBeTruthy();
      expect(e.getTagName()).toEqual('div');
    });

    it('should render video tag', function () {
      const e = element(by.tagName('video'));
      expect(e).toBeTruthy();
      expect(e.getTagName()).toEqual('video');
    });
  });
});
