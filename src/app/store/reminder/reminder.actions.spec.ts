import * as fromReminder from './reminder.actions';

fdescribe('Add reminder actions', () => {
  it('should return an add reminder action', () => {
    const actionData = {
      day: 1,
      month: 1,
      reminder: {
        city: '',
        color: '',
        reminder: '',
        time: ''
      },
      year: 1
    };

    expect(fromReminder.addReminder(actionData)).toEqual({
      ...actionData,
      type: '[Reminder] Add Reminder'
    });
  });
});
