import { IReminder } from './reminder.interface';

/**
 * Describes the object emitted when the
 * users request a new reminder action
 */
export interface INewReminderAction {
  year: number;
  month: number;
  day: number;
  reminder: IReminder;
}
