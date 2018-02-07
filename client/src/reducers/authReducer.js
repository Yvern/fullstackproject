import * as types from '../actions/types';

const initialState = null;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
