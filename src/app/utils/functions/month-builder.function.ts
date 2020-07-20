import { IDayInfo } from '../interfaces/day-info.interface';

/**
 * Builds an array representing the month
 * for the given date
 * @param year The year to be consulted
 * @param month The month to be built
 */
export const buildMonthArray = (year: number, month: number): IDayInfo[] => {
  const array: IDayInfo[] = [];

  const startIndex = new Date(year, month, 1).getDay();
  const monthLength = new Date(year, month + 1, 0).getDate();
  const pastMonthLength = new Date(year, month, 0).getDate();

  for (let i = 0; i < startIndex; i++) {
    array.push({
      disabled: true,
      dayNumber: pastMonthLength + i - startIndex + 1,
      isEdge: array.length === 0 || (array.length + 1) % 7 === 0
    });
  }

  for (let i = 0; i < monthLength; i++) {
    array.push({
      disabled: false,
      dayNumber: i + 1,
      isEdge: (array.length + 1) % 7 === 0 || array.length % 7 === 0
    });
  }

  for (let i = 0; array.length < 42; i++) {
    array.push({
      disabled: true,
      dayNumber: i + 1,
      isEdge: (array.length + 1) % 7 === 0 || array.length % 7 === 0
    });
  }

  return array;
};
