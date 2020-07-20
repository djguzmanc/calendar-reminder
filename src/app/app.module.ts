import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarDayComponent } from './calendar/calendar-day/calendar-day.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReminderEditorComponent } from './calendar/reminder-editor/reminder-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReminderComponent } from './calendar/calendar-day/reminder/reminder.component';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './custom-modules/material.module';
import { StoreNgrxModule } from './custom-modules/store.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

/**
 * Main module
 */
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarDayComponent,
    ReminderEditorComponent,
    ReminderComponent
  ],
  imports: [
    BrowserModule,
    PerfectScrollbarModule,
    MaterialModule,
    SharedPipesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreNgrxModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
