import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventResponseReducer from './eventResponseReducer';
import userEventsReducer from './userEventsReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  events: userEventsReducer,
  form: formReducer,
  eventResponse: eventResponseReducer
});
