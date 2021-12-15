/* eslint-disable import/prefer-default-export */
import { RootState } from '../types';

export const selectFolders = (state: RootState) => state.folders;
export const selectSelectedFolder = (state: RootState) => state.folders.selected;
