import * as types from '../actions/types';

const initialState = null;

/**
 * This reducer handles the slice of state where information about the current
 * local user is stored.
 */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
