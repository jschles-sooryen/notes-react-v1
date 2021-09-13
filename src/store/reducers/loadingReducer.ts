import { AnyAction } from '@reduxjs/toolkit';
import { LOADING } from '../actions/types';

const initialState = false;

function loadingReducer(state: boolean = initialState, action: AnyAction): boolean {
  switch (action.type) {
    case LOADING:
      return !state;
    default:
      return state;
  }
}

export default loadingReducer;
