/* eslint-disable import/prefer-default-export */
import { RootState } from '../types';

export const selectNotes = (state: RootState) => state.notes;
export const selectSelectedNote = (state: RootState) => state.notes.selected;
export const selectIsCreatingNote = (state: RootState) => state.notes.isCreatingNote;
