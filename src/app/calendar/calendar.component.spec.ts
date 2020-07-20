import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReminderEditorComponent } from './reminder-editor/reminder-editor.component';
import { of } from 'rxjs';
import { IReminder } from '../utils/interfaces/reminder.interface';

fdescribe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let matDialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [
        {
          provide: MatDialog, useValue: {
            open: () => { }
          }
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    matDialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;

    component.year = 2020;
    component.month = 7;

    component.days = [
      {
        dayNumber: 20,
        disabled: false,
        isEdge: false,
        reminders: []
      }
    ];

    fixture.detectChanges();
  });

  it('should open the reminder creation modal', fakeAsync(() => {
    const openCall = spyOn(matDialog, 'open').and.returnValue({
      afterClosed: () => of(false)
    } as any);

    const button = fixture.debugElement.query(By.css('app-calendar-day'));
    button.triggerEventHandler('click', null);

    expect(openCall).toHaveBeenCalledWith(ReminderEditorComponent, {
      data: {
        currentYear: component.year,
        currentMonth: component.month,
        day: 20
      },
    });
  }));

  it('should emit a new reminder action', fakeAsync(() => {
    const reminder = {
      city: 'London',
      color: '#fff',
      time: '9:00 AM',
      reminder: 'Do shores'
    } as IReminder;

    spyOn(matDialog, 'open').and.returnValue({
      afterClosed: () => of({ ...reminder })
    } as any);

    const emitCall = spyOn(component.newReminder, 'emit');

    const button = fixture.debugElement.query(By.css('app-calendar-day'));
    button.triggerEventHandler('click', null);

    expect(emitCall).toHaveBeenCalledWith({
      year: component.year,
      month: component.month,
      day: 20,
      reminder: { ...reminder }
    });
  }));

});
