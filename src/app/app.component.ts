import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarState } from './store';
import { allReminders } from './store/reminder/reminder.selectors';
import { IDayInfo } from './utils/interfaces/day-info.interface';
import { IReminder } from './utils/interfaces/reminder.interface';
import { Observable } from 'rxjs';
import { addReminder, editReminder, deleteAllReminders } from './store/reminder/reminder.actions';
import { INewReminderAction } from './utils/interfaces/new-reminder-action.interface';
import { IEditedReminderAction } from './utils/interfaces/edited-reminder-action.interface';

/**
 * `Smart component` for displaying a calendar
 * an managing its state
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  /**
   * The year to be displayed
   */
  currentYear: number;

  /**
   * The month to be displayed
   */
  currentMonth: number;

  /**
   * The days stream holding the month
   * and all it's days
   */
  days$: Observable<Array<IDayInfo & { reminders: IReminder[] }>>;

  constructor(
    private readonly store: Store<CalendarState>
  ) {

    const date = new Date();

    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();

    this.initializeDaysStream();
  }

  /**
   * Initializes the days stream
   */
  initializeDaysStream(): void {
    this.days$ = this.store.select(allReminders(this.currentYear, this.currentMonth));
  }

  /**
   * Dispatches a new reminder action
   * @param reminderData The reminder data
   */
  onNewReminder(reminderData: INewReminderAction): void {
    this.store.dispatch(addReminder(reminderData));
  }

  /**
   * Dispatches a new reminder edition action
   * @param reminderData The reminder data
   */
  onEditedReminder(reminderData: IEditedReminderAction): void {
    this.store.dispatch(editReminder(reminderData));
  }

  /**
   * Called when user changes month or year view
   * @param date The new date
   */
  onDateChange(date: {
    year: number;
    month: number;
  }): void {
    this.currentYear = date.year;
    this.currentMonth = date.month;
    this.initializeDaysStream();
  }

  /**
   * Dispatches a delete action
   * @param event The delete info
   */
  onDeleteAll(event: {
    year: number;
    month: number;
    day: number;
  }): void {
    this.store.dispatch(deleteAllReminders(event));
  }
}
