import {
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_INIT,
  FETCH_NOTES_FAIL,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from './index.js';

export const fetchNotes = () => ({ type: FETCH_NOTES_INIT });

export const fetchNotesSuccess = (payload) => ({ type: FETCH_NOTES_SUCCESS, payload });

export const fetchNotesFail = () => ({ type: FETCH_NOTES_FAIL });

export const createNote = (note) => ({ type: CREATE_NOTE, payload: note });

export const updateNote = (note) => ({ type: UPDATE_NOTE, payload: note });

export const deleteNote = (id) => ({ type: DELETE_NOTE, payload: id });