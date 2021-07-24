import {
  FETCH_NOTES_SUCCESS,
} from '../actions/types';

const initialState = {
  notes: [],
  selected: null,
};

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return { notes: action.payload, selected: state.selected || action.payload?.[0].id || null };
    default:
      return state;
  }
}

export default notesReducer;
