import {
  FETCH_FOLDERS_SUCCESS,
  FETCH_FOLDERS_INIT,
  FETCH_FOLDERS_FAIL,
  CREATE_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from './types';

export const fetchFolders = () => ({ type: FETCH_FOLDERS_INIT });

export const fetchFoldersSuccess = (payload) => ({ type: FETCH_FOLDERS_SUCCESS, payload });

export const fetchFoldersFail = () => ({ type: FETCH_FOLDERS_FAIL });

export const createFolder = (folder) => ({ type: CREATE_FOLDER, payload: folder });

export const updateFolder = (folder) => ({ type: UPDATE_FOLDER, payload: folder });

export const deleteFolder = (id) => ({ type: DELETE_FOLDER, payload: id });

export const createNote = (note) => ({ type: CREATE_NOTE, payload: note });

export const updateNote = (note) => ({ type: UPDATE_NOTE, payload: note });

export const deleteNote = (id) => ({ type: DELETE_NOTE, payload: id });
