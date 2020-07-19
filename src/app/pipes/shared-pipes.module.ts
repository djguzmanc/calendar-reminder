import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate.pipe';

const pipes = [
  TruncatePipe
];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class SharedPipesModule { }
