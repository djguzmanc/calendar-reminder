/**
 * Describes the forecast response
 */
export interface IForecastWeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: IList[];
  city: ICity;
}

// tslint:disable-next-line: completed-docs
interface ICity {
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

// tslint:disable-next-line: completed-docs
interface ICoord {
  lat: number;
  lon: number;
}

// tslint:disable-next-line: completed-docs
interface IList {
  dt: number;
  main: IMain;
  weather: IWeather[];
  clouds: IClouds;
  wind: IWind;
  visibility: number;
  pop: number;
  rain?: IRain;
  sys: ISys;
  dt_txt: string;
}

// tslint:disable-next-line: completed-docs
interface ISys {
  pod: string;
}

// tslint:disable-next-line: completed-docs
interface IRain {
  '3h': number;
}

// tslint:disable-next-line: completed-docs
interface IWind {
  speed: number;
  deg: number;
}

// tslint:disable-next-line: completed-docs
interface IClouds {
  all: number;
}

// tslint:disable-next-line: completed-docs
interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// tslint:disable-next-line: completed-docs
interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}
