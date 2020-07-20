import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { DAYS } from '../utils/constants/days.constant';
import { MatDialog } from '@angular/material/dialog';
import { ReminderEditorComponent } from './reminder-editor/reminder-editor.component';
import { IReminder } from '../utils/interfaces/reminder.interface';
import { IDayInfo } from '../utils/interfaces/day-info.interface';
import { INewReminderAction } from '../utils/interfaces/new-reminder-action.interface';
import { IEditedReminderAction } from '../utils/interfaces/edited-reminder-action.interface';

/**
 * `Semi smart Component` for displaying a
 * calendar for a year and a month
 */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges {

  /**
   * The days to be displayed
   */
  @Input()
  days: Array<IDayInfo & { reminders: IReminder[] }>;

  /**
   * The current year
   */
  @Input()
  year: number;

  /**
   * The current month
   */
  @Input()
  month: number;

  /**
   * Emits a new reminder event
   */
  @Output()
  newReminder = new EventEmitter<INewReminderAction>();

  /**
   * Emits an edition reminder event
   */
  @Output()
  editedReminder = new EventEmitter<IEditedReminderAction>();

  /**
   * Emits a date change event
   */
  @Output()
  dateChange = new EventEmitter<{
    year: number;
    month: number;
  }>();

  /**
   * Emits a delete event
   */
  @Output()
  deleteAll = new EventEmitter<{
    year: number;
    month: number;
    day: number;
  }>();

  /**
   * Holds all days
   */
  dayLabels = DAYS;

  /**
   * Holds the current date
   */
  currentDate: Date;

  constructor(
    private readonly matDialog: MatDialog
  ) { }

  // tslint:disable-next-line: completed-docs
  ngOnInit(): void { }

  // tslint:disable-next-line: completed-docs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.year || changes.month) {
      const year = changes.year ? changes.year.currentValue : this.year;
      const month = changes.month ? changes.month.currentValue : this.month;
      this.currentDate = new Date(year, month);
    }
  }

  /**
   * Optimizes angular day rendering
   * @param item The day data
   */
  dayTrackBy(item: IDayInfo): string {
    return `${this.year}/${this.month}/${item.dayNumber}`;
  }

  /**
   * Opens the reminder editor when user hits
   * space button
   * @param day The day info
   * @param event The keyboard event
   */
  fromKeyUp(day: IDayInfo, event: KeyboardEvent): void {
    if (event.key === ' ') {
      this.onDayClick(day);
    }
  }

  /**
   * Opens the reminder editor when user clicks
   * @param day The day info
   */
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

  /**
   * Opens the reminder editor when user click one
   * @param day The day info
   * @param index The reminder array index
   * @param reminder The reminder data
   */
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

  /**
   * Emits a new delete all event
   * @param day The day info
   */
  onDeleteAll(day: IDayInfo): void {
    this.deleteAll.emit({
      year: this.year,
      month: this.month,
      day: day.dayNumber
    });
  }

  /**
   * Emits a new next month event
   */
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

  /**
   * Emits a new prev month event
   */
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
