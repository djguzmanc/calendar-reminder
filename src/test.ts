// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// tslint:disable-next-line: completed-docs
declare const require: {
  // tslint:disable-next-line: completed-docs
  context(path: string, deep?: boolean, filter?: RegExp): {
    // tslint:disable-next-line: completed-docs
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
// tslint:disable-next-line: completed-docs
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
