import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { IReminder } from 'src/app/utils/interfaces/reminder.interface';

@Component({
  selector: 'app-reminder-editor',
  templateUrl: './reminder-editor.component.html',
  styleUrls: ['./reminder-editor.component.scss']
})
export class ReminderEditorComponent implements OnInit {

  date: Date;

  reminderForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      currentYear: number;
      currentMonth: number;
      day: number;
      reminder?: IReminder
    },
    private matDialogRef: MatDialogRef<ReminderEditorComponent>
  ) { }

  ngOnInit(): void {
    this.date = new Date(
      this.data.currentYear,
      this.data.currentMonth,
      this.data.day
    );

    this.reminderForm = new FormGroup({
      reminder: new FormControl(this.data.reminder?.reminder, [Validators.required, Validators.maxLength(30)]),
      city: new FormControl(this.data.reminder?.city, [Validators.required]),
      color: new FormControl(this.data.reminder?.color || '#ff8e24', [Validators.required]),
      time: new FormControl(this.data.reminder?.time || '9:00', [Validators.required]),
    });
  }

  onTimeClick(timePickerRef: NgxMaterialTimepickerComponent): void {
    timePickerRef.open();
  }

  createReminder(): void {
    if (this.reminderForm.valid) {
      this.matDialogRef.close(this.reminderForm.value);
    }
  }

  onCancelClick(): void {
    this.matDialogRef.close();
  }

}
