import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';

/**
 * `Dumb component` for displaying the reminder
 * info
 */
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReminderComponent implements OnInit {

  /**
   * Reminder info
   */
  @Input()
  reminder: IReminder;

  // tslint:disable-next-line: completed-docs
  ngOnInit(): void {
  }

}
