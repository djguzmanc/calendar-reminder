import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

/**
 * Modules to export
 */
const modules = [
  MatTooltipModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  NgxMaterialTimepickerModule
];

/**
 * Material module
 */
@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule { }
