import { SET_LAYOUT } from '../actions/types';

const initialState = 'column';

function layoutReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LAYOUT:
      return action.payload;
    default:
      return state;
  }
}

export default layoutReducer;
