import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventResponseReducer from './eventResponseReducer';
import userEventsReducer from './userEventsReducer';
import userSquadsReducer from './userSquadsReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  events: userEventsReducer,
  squads: userSquadsReducer,
  form: formReducer,
  eventResponse: eventResponseReducer
});
