import {
  FETCH_NOTES_SUCCESS,
  SET_SELECTED_NOTE,
} from '../actions/types';

const initialState = {
  notes: [],
  selected: null,
};

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return { notes: action.payload, selected: state.selected || action.payload?.[0].id || null };
    case SET_SELECTED_NOTE:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
}

export default notesReducer;
