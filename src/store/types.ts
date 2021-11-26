/* eslint-disable @typescript-eslint/no-empty-interface */
interface BaseAttributes {
  _id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Folder extends BaseAttributes { }

export interface Note extends BaseAttributes {
  folder: string;
  description: string;
}

export interface User {
  _id: string;
  email: string;
  // folders: Folder[]; ??
}

export type FoldersState = {
  folders: Folder[];
  selected: null | string;
};

export type NotesState = {
  notes: Note[],
  selected: null | string;
  isCreatingNote: boolean;
};

export type AuthState = {
  user: null | User | string;
};

export type LayoutState = 'column' | 'grid';

export type RootState = {
  folders: FoldersState;
  notes: NotesState;
  loading: boolean;
  layout: LayoutState;
  auth: AuthState;
};
