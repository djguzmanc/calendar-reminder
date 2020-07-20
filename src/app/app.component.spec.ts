import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { CalendarState } from './store';
import { By } from '@angular/platform-browser';
import { IReminder } from './utils/interfaces/reminder.interface';
import { addReminder } from './store/reminder/reminder.actions';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('CalendarContainerComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<CalendarState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: Store, useValue: {
            dispatch: () => { },
            select: () => { }
          }
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should dispatch the create reminder action', fakeAsync(() => {
    const storeCall = spyOn(store, 'dispatch');

    const eventData = {
      year: 2020,
      month: 7,
      day: 20,
      reminder: {
        city: 'London',
        color: '#fff',
        reminder: 'Wash dishes',
        time: '9:00 AM'
      } as IReminder
    };

    const calendar = fixture.debugElement.query(By.css('app-calendar'));
    calendar.triggerEventHandler('newReminder', eventData);

    expect(storeCall).toHaveBeenCalledWith(addReminder(eventData));
  }));
});
