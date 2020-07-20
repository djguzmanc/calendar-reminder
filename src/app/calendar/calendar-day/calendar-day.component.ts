import { Component, OnInit, Input, HostBinding, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit, OnChanges {

  constructor() { }

  @Input()
  width: number;

  @Input()
  height: number;

  @Input()
  dayNumber: number;

  @Input()
  reminders: IReminder[];

  @Input()
  isEdge: boolean = false;

  @Input()
  disabled: boolean = false;

  @Output()
  action = new EventEmitter<{
    index: number,
    reminder: IReminder
  }>();

  @Output()
  deleteAll = new EventEmitter<void>();

  @HostBinding('style.background-color')
  bgColor: string = 'white';

  @HostBinding('style.cursor')
  cursor: string = 'pointer';

  ngOnInit(): void { }

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

  onKeyAction(index: number, reminder: IReminder, event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.stopPropagation();
      this.onReminderClick(index, reminder);
    }
  }

  onReminderClick(index: number, reminder: IReminder, event?: MouseEvent): void {
    event?.stopPropagation();
    this.action.emit({
      index,
      reminder
    });
  }

  onKeyActionDelete(e: KeyboardEvent): void {
    if (e.key === ' ') {
      e.stopPropagation();
      this.onDeleteAllClick();
    }
  }

  onDeleteAllClick(e?: MouseEvent): void {
    e?.stopPropagation();
    this.deleteAll.emit();
  }

}
