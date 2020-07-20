import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../store/';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/**
 * Ngrx Module
 */
@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [
    StoreModule,
    !environment.production ? StoreDevtoolsModule : [],
  ]
})
export class StoreNgrxModule { }
