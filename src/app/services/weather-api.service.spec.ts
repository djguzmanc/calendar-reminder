import { TestBed } from '@angular/core/testing';

import { WeatherApiService } from './weather-api.service';

xdescribe('WeatherApiService', () => {
  let service: WeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
