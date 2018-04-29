import * as types from '../actions/types';

const initialState = null;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SQUAD:
      return action.payload || false;
    case types.CLEAR_SQUAD:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
