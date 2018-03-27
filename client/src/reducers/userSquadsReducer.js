import * as types from '../actions/types';

const initialState = [];

const userSquadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SQUADS:
      return action.payload || false;
    default:
      return state;
  }
};

export default userSquadsReducer;
