import * as types from '../actions/types';

const initialState = [];

/**
 * This reducer handles the slice of state where information about the list of
 * events stored for a user is saved.
 */
const userEventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EVENTS:
      return action.payload || false;
    default:
      return state;
  }
};

export default userEventsReducer;
