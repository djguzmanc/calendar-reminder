import { createReducer, on } from '@ngrx/store';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';
import { addReminder } from './reminder.actions';

export const reminderFeatureKey = 'reminder';

export type RemindersState = {
  [key: number]: {
    [key: number]: {
      [key: number]: Array<IReminder>
    }
  }
};

export const initialState: RemindersState = {};

export const remindersReducer = createReducer(
  initialState,
  on(addReminder, (state, action) => {

    const yearData = state[action.year] || {};
    const monthData = yearData[action.month] || {};
    const dayData = monthData[action.day] || [];

    const copy = [...dayData];
    copy.push(action.reminder);

    return {
      ...state,
      [action.year]: {
        ...yearData,
        [action.month]: {
          ...monthData,
          [action.day]: copy
        }
      }
    };
  })
);

