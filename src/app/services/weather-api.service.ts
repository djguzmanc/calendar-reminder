import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICurrentWeatherResponse } from '../utils/interfaces/current-weather-response.interface';
import { IForecastWeatherResponse } from '../utils/interfaces/forecast-weather-response.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  readonly baseUrl: string = 'http://api.openweathermap.org/data/2.5';
  readonly appId: string = 'b714f7701b6f019b096eb34d6a561b67';

  constructor(
    private http: HttpClient
  ) { }

  getCurrentWeatherByCity(city: string) {
    return this.http.get<ICurrentWeatherResponse>(`${this.baseUrl}/weather`, {
      params: { q: city, appid: this.appId }
    });
  }

  getForecastWeatherByCity(city: string) {
    return this.http.get<IForecastWeatherResponse>(`${this.baseUrl}/forecast`, {
      params: { q: city, appid: this.appId }
    });
  }
}
