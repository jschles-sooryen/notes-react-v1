import { AnyAction } from '@reduxjs/toolkit';
import { Folder, Note } from '../types';
import {
  FETCH_FOLDERS_SUCCESS,
  FETCH_FOLDERS_INIT,
  FETCH_FOLDERS_FAIL,
  CREATE_FOLDER_INIT,
  UPDATE_FOLDER_INIT,
  UPDATE_FOLDER_SUCCESS,
  UPDATE_FOLDER_FAIL,
  FETCH_NOTES_INIT,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAIL,
  CREATE_NOTE_INIT,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAIL,
  UPDATE_NOTE_INIT,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAIL,
  DELETE_NOTE_INIT,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
  SET_LAYOUT,
  LOADING,
  CREATE_FOLDER_SUCCESS,
  CREATE_FOLDER_FAIL,
  SET_SELECTED_FOLDER,
  DELETE_FOLDER_INIT,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAIL,
  SET_SELECTED_NOTE,
  TOGGLE_CREATE_NOTE,
} from './types';

export const fetchFolders = (): AnyAction => ({ type: FETCH_FOLDERS_INIT });

export const fetchFoldersSuccess = (payload: Folder[]): AnyAction => ({
  type: FETCH_FOLDERS_SUCCESS,
  payload,
});

export const fetchFoldersFail = (): AnyAction => ({ type: FETCH_FOLDERS_FAIL });

export const setSelectedFolder = (id: number | null): AnyAction => ({
  type: SET_SELECTED_FOLDER,
  payload: id,
});

export const setSelectedNote = (id: number | null): AnyAction => ({
  type: SET_SELECTED_NOTE,
  payload: id,
});

export const toggleCreateNote = (): AnyAction => ({ type: TOGGLE_CREATE_NOTE });

export const createFolder = (name: { name: string }): AnyAction => ({
  type: CREATE_FOLDER_INIT,
  payload: name,
});

export const createFolderSuccess = (data: Folder): AnyAction => ({
  type: CREATE_FOLDER_SUCCESS,
  payload: data,
});

export const createFolderFail = (): AnyAction => ({ type: CREATE_FOLDER_FAIL });

export const updateFolderInit = (folder: Folder): AnyAction => ({
  type: UPDATE_FOLDER_INIT,
  payload: folder,
});

export const updateFolderSuccess = (data: Folder): AnyAction => ({
  type: UPDATE_FOLDER_SUCCESS,
  payload: data,
});

export const updateFolderFail = (): AnyAction => ({ type: UPDATE_FOLDER_FAIL });

export const deleteFolderInit = (id: number): AnyAction => ({
  type: DELETE_FOLDER_INIT,
  payload: id,
});

export const deleteFolderSuccess = (id: number): AnyAction => ({
  type: DELETE_FOLDER_SUCCESS,
  payload: id,
});

export const deleteFolderFail = (): AnyAction => ({ type: DELETE_FOLDER_FAIL });

export const fetchNotesInit = (id: number): AnyAction => ({
  type: FETCH_NOTES_INIT,
  payload: id,
});

export const fetchNotesSuccess = (payload: Note[]): AnyAction => ({
  type: FETCH_NOTES_SUCCESS,
  payload,
});

export const fetchNotesFail = (): AnyAction => ({ type: FETCH_NOTES_FAIL });

export const createNoteInit = (note: {
  name: string;
  description: string;
}): AnyAction => ({ type: CREATE_NOTE_INIT, payload: note });

export const createNoteSuccess = (data: Note): AnyAction => ({
  type: CREATE_NOTE_SUCCESS,
  payload: data,
});

export const createNoteFail = (): AnyAction => ({ type: CREATE_NOTE_FAIL });

export const updateNoteInit = (note: {
  name: string;
  description: string;
}): AnyAction => ({ type: UPDATE_NOTE_INIT, payload: note });

export const updateNoteSuccess = (data: Note): AnyAction => ({
  type: UPDATE_NOTE_SUCCESS,
  payload: data,
});

export const updateNoteFail = (): AnyAction => ({ type: UPDATE_NOTE_FAIL });

export const deleteNoteInit = (): AnyAction => ({ type: DELETE_NOTE_INIT });

export const deleteNoteSuccess = (id: number): AnyAction => ({
  type: DELETE_NOTE_SUCCESS,
  payload: id,
});

export const deleteNoteFail = (): AnyAction => ({ type: DELETE_NOTE_FAIL });

export const setLayout = (layout: string): AnyAction => ({
  type: SET_LAYOUT,
  payload: layout,
});

export const loading = (): AnyAction => ({ type: LOADING });
