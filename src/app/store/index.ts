import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RemindersState, remindersReducer, reminderFeatureKey } from './reminder/reminder.reducer';

/**
 * Represent a calendar state
 */
// tslint:disable-next-line: interface-name
export interface CalendarState {
  [reminderFeatureKey]: RemindersState;
}

/**
 * Represent the calendar state reducer
 */
export const reducers: ActionReducerMap<CalendarState> = {
  [reminderFeatureKey]: remindersReducer
};

/**
 * Meta reducers for calendar state
 */
export const metaReducers: Array<MetaReducer<CalendarState>> = !environment.production ? [] : [];
