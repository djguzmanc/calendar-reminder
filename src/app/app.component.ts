import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarState } from './store';
import { allReminders } from './store/reminder/reminder.selectors';
import { IDayInfo } from './utils/interfaces/day-info.interface';
import { IReminder } from './utils/interfaces/reminder.interface';
import { Observable } from 'rxjs';
import { addReminder, editReminder } from './store/reminder/reminder.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentYear: number;
  currentMonth: number;

  days$: Observable<Array<IDayInfo & { reminders: IReminder[] }>>;

  constructor(
    private store: Store<CalendarState>
  ) {

    const date = new Date();

    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();

    this.days$ = store.select(allReminders(this.currentYear, this.currentMonth));
  }

  onNewReminder(reminderData: any): void {
    this.store.dispatch(addReminder(reminderData));
  }

  onEditedReminder(reminderData: any): void {
    this.store.dispatch(editReminder(reminderData));
  }
}
