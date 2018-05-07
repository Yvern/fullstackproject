import * as types from '../actions/types';

const initialState = {
  squad: null,
  user: null,
  events: null
};

const authReducer = (state = initialState, action) => {
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

export default authReducer;
