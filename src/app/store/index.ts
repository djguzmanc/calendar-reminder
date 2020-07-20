import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RemindersState, remindersReducer, reminderFeatureKey } from './reminder/reminder.reducer';

export interface CalendarState {
  [reminderFeatureKey]: RemindersState;
}

export const reducers: ActionReducerMap<CalendarState> = {
  [reminderFeatureKey]: remindersReducer
};


export const metaReducers: MetaReducer<CalendarState>[] = !environment.production ? [] : [];
