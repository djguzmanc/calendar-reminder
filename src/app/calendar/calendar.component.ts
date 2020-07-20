import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DAYS } from '../utils/constants/days.constant';
import { MatDialog } from '@angular/material/dialog';
import { ReminderEditorComponent } from './reminder-editor/reminder-editor.component';
import { IReminder } from '../utils/interfaces/reminder.interface';
import { IDayInfo } from '../utils/interfaces/day-info.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input()
  days: Array<IDayInfo & { reminders: IReminder[] }>;

  @Input()
  year: number;

  @Input()
  month: number;

  @Output()
  newReminder = new EventEmitter<{
    year: number;
    month: number;
    day: number;
    reminder: IReminder
  }>();

  @Output()
  editedReminder = new EventEmitter<{
    index: number;
    year: number;
    month: number;
    day: number;
    reminder: IReminder
  }>();

  @Output()
  dateChange = new EventEmitter<{
    year: number;
    month: number;
  }>();

  @Output()
  deleteAll = new EventEmitter<{
    year: number;
    month: number;
    day: number;
  }>();

  dayLabels = DAYS;
  dayHeight: number;
  currentDate: Date;

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.year || changes.month) {
      const year = changes.year ? changes.year.currentValue : this.year;
      const month = changes.month ? changes.month.currentValue : this.month;
      this.currentDate = new Date(year, month);
    }
  }

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
          this.newReminder.emit({
            year: this.year,
            month: this.month,
            day: day.dayNumber,
            reminder: res
          });
        }
      });
    }
  }

  onReminderClick(day: IDayInfo, index: number, reminder: IReminder): void {
    this.matDialog.open(ReminderEditorComponent, {
      data: {
        currentYear: this.year,
        currentMonth: this.month,
        day: day.dayNumber,
        reminder
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.editedReminder.emit({
          year: this.year,
          month: this.month,
          day: day.dayNumber,
          reminder: res,
          index
        });
      }
    });
  }

  onDeleteAll(day: IDayInfo): void {
    this.deleteAll.emit({
      year: this.year,
      month: this.month,
      day: day.dayNumber
    });
  }

  onNextMonth(): void {
    let month = this.month;
    let year = this.year;

    if (month === 11) {
      year++;
      month = 0;
    } else {
      month++;
    }

    this.dateChange.emit({ month, year });
  }

  onPrevMonth(): void {
    let month = this.month;
    let year = this.year;

    if (month === 0) {
      year--;
      month = 11;
    } else {
      month--;
    }

    this.dateChange.emit({ month, year });
  }

}
