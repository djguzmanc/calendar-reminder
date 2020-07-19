import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RemindersState } from './reminder.reducer';
import { buildMonthArray } from 'src/app/utils/functions/month-builder.function';

const getAllReminders = createFeatureSelector<RemindersState>('reminders');

export const allReminders = (year: number, month: number) => {

  const monthArray = buildMonthArray(year, month);

  return createSelector(
    getAllReminders,
    (reminders) => {
      return monthArray.map(day => {
        const yearData = reminders[year] || {};
        const monthData = yearData[month] || {};
        const dayData = monthData[day.dayNumber] || [];

        return {
          ...day,
          reminders: dayData
        };
      });
    }
  );
};

