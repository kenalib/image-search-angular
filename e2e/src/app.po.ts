import { browser, by, element } from 'protractor';
const path = require('path');

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getSearchResult() {
    return element.all(by.css('.flexItem'));
  }

  selectMatOptionAtStart(value: string) {
    element(by.css('span.mat-select-placeholder')).click();
    browser.waitForAngular();
    element(by.css('mat-option[ng-reflect-value="' + value + '"]')).click();
    browser.waitForAngular();
    browser.sleep(1000);
  }

  selectMatOptionChange(value: string) {
    element(by.css('div.mat-select-value')).click();
    browser.waitForAngular();
    element(by.css('mat-option[ng-reflect-value="' + value + '"]')).click();
    browser.waitForAngular();
    browser.sleep(1000);
  }

  getMessages() {
    return element(by.css('app-messages')).getText();
  }

  uploadFile(filename: string) {
    const absolutePath = path.resolve(__dirname, filename);
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    browser.waitForAngular();
  }

  browserSleep(milsec: number) {
    browser.sleep(milsec);
  }
}
