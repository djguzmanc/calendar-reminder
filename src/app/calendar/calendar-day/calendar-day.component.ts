import { Component, OnInit, Input, HostBinding } from '@angular/core';
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

}
