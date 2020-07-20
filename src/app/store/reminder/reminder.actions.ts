import { createAction, props } from '@ngrx/store';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';

export const addReminder = createAction(
  '[Reminder] Add Reminder',
  props<{
    reminder: IReminder;
    year: number;
    month: number;
    day: number;
  }>()
);

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

export const deleteAllReminders = createAction(
  '[Reminder] Delete All Reminders',
  props<{
    year: number;
    month: number;
    day: number;
  }>()
);
