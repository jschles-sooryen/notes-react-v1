import { AnyAction } from 'redux';
import { SET_LAYOUT } from '../actions/types';
import { LayoutState } from '../types';

const initialState = 'column';

function layoutReducer(state: LayoutState = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_LAYOUT:
      return action.payload;
    default:
      return state;
  }
}

export default layoutReducer;
