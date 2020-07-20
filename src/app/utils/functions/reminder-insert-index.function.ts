import { IReminder } from '../interfaces/reminder.interface';

/**
 * Converts a time string into an integer for further sorting
 * @param time The string representing the time i.e. `8:00`
 */
const timeToInteger = (time?: string): number | undefined => {
  if (time) {
    return +time.split(':').join('');
  }
};

/**
 * Find the correct index to insert the new reminder
 * @param reminder The reminder
 * @param collection The actual reminder collection
 */
export const findReminderIndex = (reminder: IReminder, collection: IReminder[]): {
  found: boolean;
  index: number;
} => {
  let minIndex = 0;
  let maxIndex = collection.length - 1;
  let currentIndex;
  let currentTime;

  const reminderTime = timeToInteger(reminder.time);

  while (minIndex <= maxIndex) {
    currentIndex = Math.floor((minIndex + maxIndex) / 2);
    currentTime = timeToInteger(collection[currentIndex].time);

    if (currentTime < reminderTime) {
      minIndex = currentIndex + 1;
    } else if (currentTime > reminderTime) {
      maxIndex = currentIndex - 1;
    } else {
      return {
        found: true,
        index: currentIndex
      };
    }
  }

  return {
    found: false,
    index: currentTime < reminderTime ? currentIndex + 1 : currentIndex
  };
};
