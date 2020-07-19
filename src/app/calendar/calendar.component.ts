import { Component, OnInit, Input } from '@angular/core';
import { DAYS } from '../utils/constants/days.constant';
import { MatDialog } from '@angular/material/dialog';
import { ReminderEditorComponent } from './reminder-editor/reminder-editor.component';
import { Store } from '@ngrx/store';
import { CalendarState } from '../store';
import { addReminder } from '../store/reminder/reminder.actions';
import { IReminder } from '../utils/interfaces/reminder.interface';
import { IDayInfo } from '../utils/interfaces/day-info.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input()
  days: Array<IDayInfo & { reminders: IReminder[] }>;

  @Input()
  year: number;

  @Input()
  month: number;

  dayLabels = DAYS;
  dayHeight: number;

  constructor(
    private matDialog: MatDialog,
    private store: Store<CalendarState>
  ) { }

  ngOnInit(): void { }

  dayTrackBy(item: IDayInfo): string {
    return `${this.year}/${this.month}/${item.dayNumber}`;
  }

  fromKeyUp(day: IDayInfo, event: KeyboardEvent): void {
    if (event.key === ' ') {
      this.onDayClick(day);
    }
  }

  onDayClick(day: IDayInfo): void {
    if (!day.disabled) {
      this.matDialog.open(ReminderEditorComponent, {
        data: {
          currentYear: this.year,
          currentMonth: this.month,
          day: day.dayNumber
        }
      }).afterClosed().subscribe(res => {
        if (res) {
          this.store.dispatch(addReminder({
            year: this.year,
            month: this.month,
            day: day.dayNumber,
            reminder: res
          }));
        }
      });
    }
  }

}
