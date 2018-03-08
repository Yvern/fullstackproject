import * as types from '../actions/types';

const initialState = null;

const userEventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EVENTS:
      return action.payload || false;
    default:
      return state;
  }
};

export default userEventsReducer;
