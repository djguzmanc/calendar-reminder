import { browser, by, element } from 'protractor';

// tslint:disable-next-line: completed-docs
export class AppPage {
  // tslint:disable-next-line: completed-docs
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  // tslint:disable-next-line: completed-docs
  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
