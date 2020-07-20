import { Component, OnInit, Input, HostBinding, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';

/**
 * `Dumb component` representing a month day
 */
@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDayComponent implements OnInit, OnChanges {

  /**
   * The day number
   */
  @Input()
  dayNumber: number;

  /**
   * The reminders array
   */
  @Input()
  reminders: IReminder[];

  /**
   * Tells if the day is an edge on calendar (saturday or sunday)
   */
  @Input()
  isEdge: boolean = false;

  /**
   * Tells if the day is disabled or not
   * (belongs to the current month)
   */
  @Input()
  disabled: boolean = false;

  /**
   * Emits an new action event
   */
  @Output()
  action = new EventEmitter<{
    index: number;
    reminder: IReminder;
  }>();

  /**
   * Emits a delete all event
   */
  @Output()
  deleteAll = new EventEmitter<void>();

  /**
   * Binds the background color fot
   * the host
   */
  @HostBinding('style.background-color')
  bgColor: string = 'white';

  /**
   * Binds the cursor style for the
   * host
   */
  @HostBinding('style.cursor')
  cursor: string = 'pointer';

  // tslint:disable-next-line: completed-docs
  ngOnInit(): void { }

  // tslint:disable-next-line: completed-docs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled) {
      if (changes.disabled.currentValue) {
        this.cursor = 'initial';
      } else {
        this.cursor = 'pointer';
      }
    }
    if (changes.isEdge) {
      if (changes.isEdge.currentValue) {
        this.bgColor = '#f2f2f2';
      } else {
        this.bgColor = 'white';
      }
    }
  }

  /**
   * Calls click event when the user hits space bar
   * on a focused reminder
   * @param index The reminder index
   * @param reminder Reminder info
   * @param event Keyboard event
   */
  onKeyAction(index: number, reminder: IReminder, event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.stopPropagation();
      this.onReminderClick(index, reminder);
    }
  }

  /**
   * Calls click event when the user clicks a reminder
   * @param index The reminder index
   * @param reminder Reminder info
   * @param event Mouse
   */
  onReminderClick(index: number, reminder: IReminder, event?: MouseEvent): void {
    event?.stopPropagation();
    this.action.emit({
      index,
      reminder
    });
  }

  /**
   * Emits a delete action when user hits space
   * bar on a focused (delete) button
   * @param e Keyboard event
   */
  onKeyActionDelete(e: KeyboardEvent): void {
    if (e.key === ' ') {
      e.stopPropagation();
      this.onDeleteAllClick();
    }
  }

  /**
   * Emits a delete action
   * @param e Mouse event
   */
  onDeleteAllClick(e?: MouseEvent): void {
    e?.stopPropagation();
    this.deleteAll.emit();
  }

}
