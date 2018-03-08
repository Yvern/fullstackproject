import axios from 'axios';
import { FETCH_USER, FETCH_EVENT, FETCH_EVENTS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitEvent = (values, history) => async dispatch => {
  const res = await axios.post('/api/events', values);
  history.push('/events');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchEventsForUser = () => async dispatch => {
  console.log('fetch events for user');
  const res = await axios.get('/api/events');
  dispatch({ type: FETCH_EVENTS, payload: res.data });
};

export const fetchEvent = query => async dispatch => {
  const queryURL = '/api/events/event/' + query;
  const res = await axios.get(queryURL);
  console.log(res.data);
  dispatch({ type: FETCH_EVENT, payload: res.data });
};

export const registerEventResponse = response => async dispatch => {
  const res = await axios.post('/api/events/respond', response);
  console.log('data from ACTION', res.data);
  dispatch({
    type: FETCH_EVENT,
    payload: { event: res.data, recipient: response.recipient.email }
  });
};
