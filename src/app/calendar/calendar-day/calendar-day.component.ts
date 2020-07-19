import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

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

  @HostBinding('style.background-color')
  bgColor: string = 'white';

  @HostBinding('style.cursor')
  cursor: string = 'pointer';

  ngOnInit(): void {
    if (this.isEdge) {
      this.bgColor = '#f2f2f2';
    }

    if (this.disabled) {
      this.cursor = 'initial';
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

}
