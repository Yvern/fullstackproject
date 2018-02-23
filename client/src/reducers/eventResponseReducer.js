import * as types from '../actions/types';

const initialState = {
  event: null,
  recipient: null
};

const eventResponseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EVENT:
      return action.payload || false;
    default:
      return state;
  }
};

export default eventResponseReducer;
