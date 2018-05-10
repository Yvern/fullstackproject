import * as types from '../actions/types';

const initialState = [];

/**
 * This reducer handles the slice of state where information about all squads
 * for a user is stored.
 */
const userSquadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SQUADS:
      return action.payload || false;
    default:
      return state;
  }
};

export default userSquadsReducer;
