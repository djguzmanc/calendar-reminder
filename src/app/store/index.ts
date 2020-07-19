import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RemindersState, remindersReducer } from './reminder/reminder.reducer';


export interface CalendarState {
  reminders: RemindersState;
}

export const reducers: ActionReducerMap<CalendarState> = {
  reminders: remindersReducer
};


export const metaReducers: MetaReducer<CalendarState>[] = !environment.production ? [] : [];
