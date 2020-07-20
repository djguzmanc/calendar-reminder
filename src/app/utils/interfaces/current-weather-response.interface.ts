/**
 * Describes the current weather response
 */
export interface ICurrentWeatherResponse {
  coord: ICoord;
  weather: IWeather[];
  base: string;
  main: IMain;
  visibility: number;
  wind: IWind;
  clouds: IClouds;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// tslint:disable-next-line: completed-docs
interface ISys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

// tslint:disable-next-line: completed-docs
interface IClouds {
  all: number;
}

// tslint:disable-next-line: completed-docs
interface IWind {
  speed: number;
  deg: number;
}

// tslint:disable-next-line: completed-docs
interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

// tslint:disable-next-line: completed-docs
interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// tslint:disable-next-line: completed-docs
interface ICoord {
  lon: number;
  lat: number;
}
