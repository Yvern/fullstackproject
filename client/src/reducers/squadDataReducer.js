import * as types from '../actions/types';

const initialState = {
  squad: null,
  user: null,
  events: null
};

/**
 * This reducer handles the slice of state where information about individual
 * squads is stored. This is used when details about a squad are retrieved from
 * the database.
 */
const squadDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SQUAD:
      return {
        ...state,
        squad: action.payload.squad || false,
        user: action.payload.user || false,
        events: action.payload.events || false
      };
    case types.CLEAR_SQUAD:
      return initialState;
    default:
      return state;
  }
};

export default squadDataReducer;
