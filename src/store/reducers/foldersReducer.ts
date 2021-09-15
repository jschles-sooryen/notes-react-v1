import { createSlice } from '@reduxjs/toolkit';
import { Folder, FoldersState } from '../types';

const initialState: FoldersState = {
  folders: [],
  selected: null,
};

const foldersSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    fetchFoldersInit() {},
    fetchFoldersSuccess(state, action) {
      state.folders = action.payload;
      state.selected = state.selected || action.payload[0].id;
    },
    fetchFoldersFail() {},
    createFolderInit: {
      reducer: () => {},
      prepare: (name: { name: string }) => ({ payload: name }),
    },
    createFolderSuccess(state, action) {
      state.folders = state.folders.concat(action.payload);
      state.selected = (state.folders[state.folders.length - 1]).id + 1;
    },
    createFolderFail() {},
    updateFolderInit: {
      reducer: () => {},
      prepare: (folder: Folder) => ({ payload: folder }),
    },
    updateFolderSuccess(state, action) {
      state.folders = (state.folders as Folder[]).map((folder: Folder) => {
        if (action.payload.id === folder.id) {
          return { ...folder, name: action.payload.name };
        }
        return folder;
      });
    },
    updateFolderFail() {},
    deleteFolderInit: {
      reducer: () => {},
      prepare: (id: number) => ({ payload: id }),
    },
    deleteFolderSuccess(state, action) {
      state.folders = state.folders.filter((folder) => folder.id !== action.payload);
    },
    deleteFolderFail() {},
    setSelectedFolder(state, action) {
      state.selected = action.payload;
    },
  },
});

export const {
  fetchFoldersInit,
  fetchFoldersSuccess,
  fetchFoldersFail,
  createFolderInit,
  createFolderFail,
  createFolderSuccess,
  updateFolderInit,
  updateFolderSuccess,
  updateFolderFail,
  deleteFolderInit,
  deleteFolderSuccess,
  deleteFolderFail,
  setSelectedFolder,
} = foldersSlice.actions;

export default foldersSlice.reducer;
