import { ReminderEditorComponent } from './reminder-editor.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('ReminderEditorComponent', () => {
  let fixture: ComponentFixture<ReminderEditorComponent>;
  let component: ReminderEditorComponent;
  let matDialogRef: MatDialogRef<ReminderEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderEditorComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {
            currentYear: 5,
            currentMonth: 5,
            day: 5,
          }
        },
        {
          provide: MatDialogRef, useValue: {
            close: () => { }
          }
        },
        { provide: WeatherApiService, useValue: {} },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderEditorComponent);
    matDialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    component.initializeForm();
    component.reminderForm.setValue({
      reminder: 'Wash the dishes',
      city: 'Bogota',
      color: '#000',
      time: '9:00 AM'
    });
  });

  it('should validate reminder has less than 30 characters', () => {
    component.reminderForm.get('reminder')?.setValue('qwertyuiopasdfghjklzxcvbnmqwert');
    expect(component.reminderForm.invalid).toBeTrue();
  });

  it('should validate the whole form has its required values', () => {
    component.initializeForm();
    expect(component.reminderForm.invalid).toBeTrue();
  });

  it('should close the modal with the new reminder info', () => {
    const closeCall = spyOn(matDialogRef, 'close');
    component.createReminder();

    expect(closeCall).toHaveBeenCalledWith({
      reminder: 'Wash the dishes',
      city: 'Bogota',
      color: '#000',
      time: '9:00 AM'
    });
  });

  it('should not close the modal with the new reminder info', () => {
    component.reminderForm.get('reminder')?.setValue(
      'Wash the dishes with a reminder which length overflows the max validator'
    );

    const closeCall = spyOn(matDialogRef, 'close');
    component.createReminder();

    expect(closeCall).not.toHaveBeenCalled();
  });

  it('should close the modal when the user clicks on create button', () => {
    const closeCall = spyOn(matDialogRef, 'close');

    const button = fixture.debugElement.query(By.css('button[type=submit]'));
    button.triggerEventHandler('click', null);

    expect(closeCall).toHaveBeenCalledWith({
      reminder: 'Wash the dishes',
      city: 'Bogota',
      color: '#000',
      time: '9:00 AM'
    });
  });

  it('should not close the modal when the user clicks on create button', () => {
    component.reminderForm.get('reminder')?.setValue(
      'Wash the dishes with a reminder which length overflows the max validator'
    );

    const closeCall = spyOn(component, 'createReminder');
    const closeDialogCall = spyOn(matDialogRef, 'close');

    const button = fixture.debugElement.query(By.css('button[type=submit]'));
    button.triggerEventHandler('click', null);

    expect(closeCall).toHaveBeenCalled();
    expect(closeDialogCall).not.toHaveBeenCalled();
  });
});
