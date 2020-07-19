import { Component, OnInit, Input } from '@angular/core';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  @Input()
  reminder: IReminder;

  constructor() { }

  ngOnInit(): void {
  }

}
