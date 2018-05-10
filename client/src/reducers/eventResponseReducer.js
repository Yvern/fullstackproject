import * as types from '../actions/types';

const initialState = {
  event: null,
  recipient: null
};

/**
 * This reducer handles the slice of state where information about individual
 * events is stored. This is used for both response, when a recipient responds
 * to an invitation, and the detailed event view.
 */
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
