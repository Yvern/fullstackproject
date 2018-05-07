import axios from 'axios';
import {
  FETCH_USER,
  FETCH_EVENT,
  FETCH_EVENTS,
  FETCH_SQUAD,
  FETCH_SQUADS,
  CLEAR_EVENT,
  CLEAR_SQUAD
} from './types';

/******** USER ACTIONS ********/

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteUser = (user, history) => async dispatch => {
  history.push('/settings/results');
  const res = await axios.post('/api/delete_user', user);
  dispatch({ type: FETCH_USER, payload: res.data });
};

/******** EVENT ACTIONS ********/

export const submitEvent = (values, history) => async dispatch => {
  const res = await axios.post('/api/events', values);
  console.log('res.data', res.data);
  history.push('/events/details/?event=' + res.data._id);
  dispatch({ type: FETCH_EVENT, payload: { event: res.data } });
};

export const fetchEventsForUser = () => async dispatch => {
  const res = await axios.get('/api/events');
  dispatch({ type: FETCH_EVENTS, payload: res.data });
};

//Clears current event data when leaving the page
export const clearEvent = () => {
  return {
    type: CLEAR_EVENT
  };
};

export const fetchEvent = query => async dispatch => {
  const queryURL = '/api/events/event/' + query;
  const res = await axios.get(queryURL);
  dispatch({ type: FETCH_EVENT, payload: res.data });
};

export const registerEventResponse = response => async dispatch => {
  const res = await axios.post('/api/events/respond', response);
  dispatch({
    type: FETCH_EVENT,
    payload: { event: res.data, recipient: response.recipient.email }
  });
};

/******** EVENT EDIT ACTIONS ********/
export const addEventRecipient = (event, recipient) => async dispatch => {
  const res = await axios.post('/api/events/addrecipient', {
    event,
    recipient
  });
  dispatch({ type: FETCH_EVENT, payload: { event: res.data } });
};

/******** SQUAD ACTIONS ********/

export const submitSquad = (values, history) => async dispatch => {
  const res = await axios.post('/api/squads', values);
  history.push('/dashboard');
  dispatch({ type: FETCH_SQUAD, payload: res.data });
};

export const fetchSquad = query => async dispatch => {
  const queryURL = '/api/squads/squad/' + query;
  const res = await axios.get(queryURL);
  dispatch({ type: FETCH_SQUAD, payload: res.data });
};

export const fetchSquadsForUser = () => async dispatch => {
  const res = await axios.get('/api/squads');
  dispatch({ type: FETCH_SQUADS, payload: res.data });
};

//Clears current squad data when leaving the page
export const clearSquad = () => {
  return {
    type: CLEAR_SQUAD
  };
};

/******** SQUAD EDIT ACTIONS ********/
export const addSquadMember = (squad, member) => async dispatch => {
  const res = await axios.post('/api/squads/addmember', {
    squad,
    member
  });
  dispatch({ type: FETCH_SQUAD, payload: res.data });
};

/******** EMAIL ACTIONS ********/
export const sendMail = event => async dispatch => {
  const res = await axios.post('/api/mail/event/invite', event);
  dispatch({ type: FETCH_EVENT, payload: { event: res.data } });
};
