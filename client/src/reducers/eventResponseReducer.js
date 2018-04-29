import * as types from '../actions/types';

const initialState = {
  event: null,
  recipient: null
};

const eventResponseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EVENT:
      return action.payload || false;
    case types.CLEAR_EVENT:
      return initialState;
    default:
      return state;
  }
};

export default eventResponseReducer;
