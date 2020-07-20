import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RemindersState, reminderFeatureKey } from './reminder.reducer';
import { buildMonthArray } from 'src/app/utils/functions/month-builder.function';

/**
 * Reminders feature selector
 */
const getAllReminders = createFeatureSelector<RemindersState>(reminderFeatureKey);

/**
 * Creates a selector for the given date and
 * memoizing the array representing the month
 * @param year The year to be consulted
 * @param month The month be consulted
 */
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
          reminders: day.disabled ? [] : dayData
        };
      });
    }
  );
};
