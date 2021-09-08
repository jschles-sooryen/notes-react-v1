interface BaseAttributes {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Folder extends BaseAttributes {}

export interface Note extends BaseAttributes {
  folderId: number;
  description: string;
}

export type FoldersState = {
  folders: Folder[];
  selected: null | number;
};

export type NotesState = {
  notes: Note[],
  selected: null | number;
  isCreatingNote: boolean;
};

export type LayoutState = 'column' | 'grid';

export type RootState = {
  folders: FoldersState;
  notes: NotesState;
  loading: boolean;
  layout: LayoutState;
};
