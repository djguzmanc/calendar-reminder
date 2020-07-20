import { IReminder } from './reminder.interface';

/**
 * Describes the object emitted when the
 * user request an edition over a reminder
 */
export interface IEditedReminderAction {
  index: number;
  year: number;
  month: number;
  day: number;
  reminder: IReminder;
}
