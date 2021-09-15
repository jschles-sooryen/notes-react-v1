import { createSlice } from '@reduxjs/toolkit';
import { Note, NotesState } from '../types';

const initialState: NotesState = {
  notes: [],
  selected: null,
  isCreatingNote: false,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    fetchNotesInit: {
      reducer: () => {},
      prepare: (id: number) => ({ payload: id }),
    },
    fetchNotesSuccess(state, action) {
      state.notes = action.payload;
    },
    fetchNotesFail() {},
    createNoteInit: {
      reducer: () => {},
      prepare: (note: { name: string; description: string; }) => ({ payload: note }),
    },
    createNoteSuccess(state, action) {
      state.notes = [action.payload, ...state.notes];
      state.selected = action.payload.id;
      state.isCreatingNote = false;
    },
    createNoteFail() {},
    updateNoteInit: {
      reducer: () => {},
      prepare: (note: { name: string; description: string; }) => ({ payload: note }),
    },
    updateNoteSuccess(state, action) {
      state.notes = state.notes.map((note: Note) => {
        if (action.payload.id === note.id) {
          return action.payload;
        }
        return note;
      });
    },
    updateNoteFail() {},
    deleteNoteInit() {},
    deleteNoteSuccess(state, action) {
      state.notes = state.notes.filter((notes) => notes.id !== action.payload);
      state.selected = null;
    },
    deleteNoteFail() {},
    setSelectedNote(state, action) {
      state.selected = action.payload;
    },
    toggleCreateNote(state) {
      state.isCreatingNote = !state.isCreatingNote;
    },
  },
});

export const {
  fetchNotesInit,
  fetchNotesSuccess,
  fetchNotesFail,
  createNoteInit,
  createNoteSuccess,
  createNoteFail,
  updateNoteInit,
  updateNoteSuccess,
  updateNoteFail,
  deleteNoteInit,
  deleteNoteSuccess,
  deleteNoteFail,
  setSelectedNote,
  toggleCreateNote,
} = notesSlice.actions;

export default notesSlice.reducer;
