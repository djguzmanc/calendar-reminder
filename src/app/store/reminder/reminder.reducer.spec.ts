import { remindersReducer, initialState } from './reminder.reducer';
import { addReminder } from './reminder.actions';

fdescribe('Reminders Reducer', () => {
  fdescribe('Add reminder action', () => {
    it('should return state with the new reminder(s)', () => {

      const day = 7;
      const month = 7;
      const year = 7;
      const reminder = {
        city: 'London',
        color: '#fff',
        reminder: 'Wash dishes',
        time: '9:00 AM'
      };

      const action = addReminder({
        day,
        month,
        year,
        reminder
      });

      let result = remindersReducer(initialState, action);

      expect(result).toEqual({
        [year]: {
          [month]: {
            [day]: [reminder]
          }
        }
      });

      result = remindersReducer(result, action);

      expect(result).toEqual({
        [year]: {
          [month]: {
            [day]: [reminder, reminder]
          }
        }
      });
    });
  });
});
