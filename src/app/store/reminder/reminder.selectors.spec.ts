import { createFeatureSelector } from '@ngrx/store';
import { RemindersState, reminderFeatureKey } from './reminder.reducer';
import * as remindersSelectors from './reminder.selectors';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';
import { buildMonthArray } from 'src/app/utils/functions/month-builder.function';

fdescribe('Reminders Selectors', () => {
  it('should create the reminders projected state', () => {
    const getAllReminders = createFeatureSelector<RemindersState>(reminderFeatureKey);
    expect(getAllReminders).toBeTruthy();
  });

  it('should return the state with the new reminder', () => {
    const year = 2020;
    const month = 7;
    const monthDay = 7;

    const reminder = {
      city: 'London',
      color: '#fff',
      reminder: 'Wash dishes',
      time: '9:00 AM'
    } as IReminder;

    const state = {
      [year]: {
        [month]: {
          [monthDay]: [
            reminder
          ]
        }
      }
    };

    const monthArray = buildMonthArray(year, month);

    expect(remindersSelectors.allReminders(year, month).projector(state)).toEqual(monthArray.map(day => {
      return {
        ...day,
        reminders: day.dayNumber === monthDay ? [reminder] : []
      };
    }));
  });
});
