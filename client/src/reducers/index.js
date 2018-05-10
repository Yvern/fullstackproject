import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventResponseReducer from './eventResponseReducer';
import userEventsReducer from './userEventsReducer';
import userSquadsReducer from './userSquadsReducer';
import squadDataReducer from './squadDataReducer';
import { reducer as formReducer } from 'redux-form';

/**
 * Combine all Redux state reducers using the Redux combineReducers function.
 * This file contains all reducers needed for the various slices of state for
 * the application.
 */
export default combineReducers({
  auth: authReducer,
  events: userEventsReducer,
  squads: userSquadsReducer,
  form: formReducer,
  eventResponse: eventResponseReducer,
  squadData: squadDataReducer
});
