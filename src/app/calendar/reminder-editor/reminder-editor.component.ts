import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';
import { Observable, of } from 'rxjs';
import { switchMap, debounceTime, filter, map, catchError, tap, startWith } from 'rxjs/operators';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ICurrentWeatherResponse } from 'src/app/utils/interfaces/current-weather-response.interface';
import { IForecastWeatherResponse } from 'src/app/utils/interfaces/forecast-weather-response.interface';

/**
 * `Semi smart component` for creating a new reminder
 */
@Component({
  selector: 'app-reminder-editor',
  templateUrl: './reminder-editor.component.html',
  styleUrls: ['./reminder-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReminderEditorComponent implements OnInit {

  /**
   * The reminder date
   */
  date: Date;

  /**
   * Reminder form instance
   */
  reminderForm: FormGroup;

  /**
   * Forecast stream
   */
  forecast$: Observable<string>;

  /**
   * Tell s if there a forecast fetch
   * in progress
   */
  isFetchingForecast: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      currentYear: number;
      currentMonth: number;
      day: number;
      reminder?: IReminder;
    },
    private readonly matDialogRef: MatDialogRef<ReminderEditorComponent>,
    private readonly weatherApi: WeatherApiService
  ) { }

  // tslint:disable-next-line: completed-docs
  ngOnInit(): void {
    this.date = new Date(
      this.data.currentYear,
      this.data.currentMonth,
      this.data.day
    );
    this.date.setHours(9, 0, 0, 0);

    this.initializeForm();
    this.initializeForecastService();
  }

  /**
   * Initializes the reminder form
   */
  initializeForm(): void {
    this.reminderForm = new FormGroup({
      reminder: new FormControl(this.data.reminder?.reminder, [Validators.required, Validators.maxLength(30)]),
      city: new FormControl(this.data.reminder?.city, [Validators.required]),
      color: new FormControl(this.data.reminder?.color || '#ff8e24', [Validators.required]),
      time: new FormControl(this.data.reminder?.time || '9:00', [Validators.required]),
    });
  }

  /**
   * Initializes the forecast service
   */
  initializeForecastService(): void {
    const isToday = this.dateIsToday(this.date);
    const distance = this.dateDaysDistance(new Date(), this.date);

    // Weather service is available iff is the selected
    // date today or between the next five days
    if (isToday || (distance < 0 && distance >= -5)) {
      const timeControl = this.reminderForm.get('time');

      this.forecast$ = this.reminderForm.get('city').valueChanges.pipe(
        debounceTime(300),
        filter(city => city),
        map(city => city.trim().toLowerCase()),
        tap(() => this.isFetchingForecast = true),
        switchMap(city => this.weatherSrc(city, isToday).pipe(
          // If time changes the forecast must be reevaluated
          // within the cached one
          switchMap(forecast => timeControl.valueChanges.pipe(startWith(timeControl.value)).pipe(
            map(time => ({ time, forecast }))
          )),
          map(({ forecast, time }) => {
            if (isToday) {
              return (forecast as ICurrentWeatherResponse).weather[0].main;
            } else {
              const targetDate = new Date(this.date);
              const [hours, mins] = time.split(':');
              targetDate.setHours(+hours, +mins);

              // Look for the closest forecast based on the
              // picked time
              const _forecast = forecast as IForecastWeatherResponse;

              // Distance * 8 since we can skip previous days
              // results (8 results by day)
              for (let i = -(distance + 1) * 8; i < _forecast.list.length; i++) {
                const forecastSlot = _forecast.list[i];
                if (new Date(forecastSlot.dt_txt).getTime() >= targetDate.getTime()) {
                  return forecastSlot.weather[0].main;
                }
              }

              return _forecast.list[_forecast.list.length - 1].weather[0].main;
            }
          }),
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
              return of(err.error?.message || 'API Error');
            }
            return of('Unexpected error');
          }),
          tap(() => this.isFetchingForecast = false)
        )),
      );
    }

  }

  /**
   * Chooses the weather data depending on
   * the date
   * @param city THe city to be queried
   * @param isToday Tells if date is actually today's date
   */
  weatherSrc(city: string, isToday: boolean): Observable<ICurrentWeatherResponse | IForecastWeatherResponse> {
    if (isToday) {
      return this.weatherApi.getCurrentWeatherByCity(city);
    }
    return this.weatherApi.getForecastWeatherByCity(city);
  }

  /**
   * Tells if the current date is actually today
   * @param date The date to evaluate
   */
  dateIsToday(date: Date): boolean {
    const today = new Date();
    return today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
  }

  /**
   * Returns the distances between two dates (in days)
   * @param a Date
   * @param b Date
   */
  dateDaysDistance(a: Date, b: Date): number {
    const _a = new Date(a);
    _a.setHours(0, 0, 0, 0);
    const _b = new Date(b);
    _b.setHours(0, 0, 0, 0);
    return (_a.getTime() - _b.getTime()) / 1000 / 60 / 60 / 24;
  }

  /**
   * Opens the time picker
   * @param timePickerRef The time picker ref
   */
  onTimeClick(timePickerRef: NgxMaterialTimepickerComponent): void {
    timePickerRef.open();
  }

  /**
   * Closes the modal with an object representing
   * the new or edited reminder
   */
  createReminder(): void {
    if (this.reminderForm.valid) {
      this.matDialogRef.close(this.reminderForm.value);
    }
  }

  /**
   * Closes the modal
   */
  onCancelClick(): void {
    this.matDialogRef.close();
  }

}
