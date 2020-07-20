import { createAction, props } from '@ngrx/store';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';

/**
 * Action to add a reminder
 */
export const addReminder = createAction(
  '[Reminder] Add Reminder',
  props<{
    reminder: IReminder;
    year: number;
    month: number;
    day: number;
  }>()
);

/**
 * Action to edit a reminder
 */
export const editReminder = createAction(
  '[Reminder] Edit Reminder',
  props<{
    reminder: IReminder;
    year: number;
    month: number;
    day: number;
    index: number;
  }>()
);

/**
 * Action to delete reminders
 */
export const deleteAllReminders = createAction(
  '[Reminder] Delete All Reminders',
  props<{
    year: number;
    month: number;
    day: number;
  }>()
);
