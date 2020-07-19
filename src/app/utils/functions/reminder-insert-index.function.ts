import { IReminder } from '../interfaces/reminder.interface';

const timeToInteger = (time?: string): number | undefined => {
  if (time) {
    return +time.split(':').join('');
  }
};

export const findReminderIndex = (reminder: IReminder, collection: IReminder[]): {
  found: boolean,
  index: number
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
