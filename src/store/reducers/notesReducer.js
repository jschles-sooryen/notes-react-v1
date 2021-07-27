import {
  FETCH_NOTES_SUCCESS,
  SET_SELECTED_NOTE,
  TOGGLE_CREATE_NOTE,
} from '../actions/types';

const initialState = {
  notes: [],
  selected: null,
  isCreatingNote: false,
};

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        selected: state.selected || action.payload?.[0].id || null,
      };
    case SET_SELECTED_NOTE:
      return { ...state, selected: action.payload };
    case TOGGLE_CREATE_NOTE:
      return { ...state, isCreatingNote: !state.isCreatingNote };
    default:
      return state;
  }
}

export default notesReducer;
