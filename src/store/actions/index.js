import {
  FETCH_FOLDERS_SUCCESS,
  FETCH_FOLDERS_INIT,
  FETCH_FOLDERS_FAIL,
  CREATE_FOLDER_INIT,
  UPDATE_FOLDER,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  LOADING,
  CREATE_FOLDER_SUCCESS,
  CREATE_FOLDER_FAIL,
  SET_SELECTED_FOLDER,
  DELETE_FOLDER_INIT,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAIL,
} from './types';

export const fetchFolders = () => ({ type: FETCH_FOLDERS_INIT });

export const fetchFoldersSuccess = (payload) => ({ type: FETCH_FOLDERS_SUCCESS, payload });

export const fetchFoldersFail = () => ({ type: FETCH_FOLDERS_FAIL });

export const setSelectedFolder = (id) => ({ type: SET_SELECTED_FOLDER, payload: id });

export const createFolder = (name) => ({ type: CREATE_FOLDER_INIT, payload: name });

export const createFolderSuccess = (data) => ({ type: CREATE_FOLDER_SUCCESS, payload: data });

export const createFolderFail = () => ({ type: CREATE_FOLDER_FAIL });

export const updateFolder = (folder) => ({ type: UPDATE_FOLDER, payload: folder });

export const deleteFolderInit = (id) => ({ type: DELETE_FOLDER_INIT, payload: id });

export const deleteFolderSuccess = (id) => ({ type: DELETE_FOLDER_SUCCESS, payload: id });

export const deleteFolderFail = (id) => ({ type: DELETE_FOLDER_FAIL, payload: id });

export const createNote = (note) => ({ type: CREATE_NOTE, payload: note });

export const updateNote = (note) => ({ type: UPDATE_NOTE, payload: note });

export const deleteNote = (id) => ({ type: DELETE_NOTE, payload: id });

export const loading = () => ({ type: LOADING });
