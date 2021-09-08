import { AnyAction } from 'redux';
import {
  FETCH_NOTES_SUCCESS,
  SET_SELECTED_NOTE,
  TOGGLE_CREATE_NOTE,
  CREATE_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
} from '../actions/types';
import { Note, NotesState } from '../types';

const initialState = {
  notes: [],
  selected: null,
  isCreatingNote: false,
};

function notesReducer(state: NotesState = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
      };
    case CREATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        selected: action.payload.id,
        isCreatingNote: false,
      };
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (action.payload.id === note.id) {
            return action.payload;
          }
          return note;
        }),
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.filter((notes) => notes.id !== action.payload),
        selected: null,
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
