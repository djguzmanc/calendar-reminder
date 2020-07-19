import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';

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
      reminder: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      city: new FormControl(null, [Validators.required]),
      color: new FormControl('#36dd4a', [Validators.required]),
      time: new FormControl('9:00 AM', [Validators.required]),
    });
  }

  onTimeChange(e: string) {
    this.reminderForm.get('time')?.setValue(e);
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
