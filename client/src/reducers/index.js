import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventResponseReducer from './eventResponseReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  eventResponse: eventResponseReducer
});
