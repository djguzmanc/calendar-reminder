import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate.pipe';

/**
 * All pipes
 */
const pipes = [
  TruncatePipe
];

/**
 * Pipes module
 */
@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class SharedPipesModule { }
