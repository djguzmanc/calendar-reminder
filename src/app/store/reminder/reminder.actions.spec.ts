import * as fromReminder from './reminder.actions';

describe('loadReminders', () => {
  it('should return an action', () => {
    expect(fromReminder.loadReminders().type).toBe('[Reminder] Load Reminders');
  });
});
