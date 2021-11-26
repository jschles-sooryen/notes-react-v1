import { Folder, Note } from '../store/types';

export type GetFoldersResponseData = {
  data: Folder[];
  message: 'success';
};

export type CreateFolderRequestParams = {
  name: string;
};

export type CreateFolderResponseData = {
  data: Folder;
  _id: string;
  message: 'success';
};

export type UpdateFolderRequestParams = {
  name: string;
  id: string;
};

export type UpdateFolderResponseData = {
  data: {
    name: string;
  };
  messsage: 'success';
};

export type DeleteFolderRequestParams = {
  id: string;
};

export type DeleteFolderResponseData = {
  message: 'deleted';
};

export type GetNotesResponseData = {
  data: Note[];
  message: 'success';
};

export type CreateNoteResponseData = {
  data: Note;
  _id: string;
  message: 'success';
};

export type CreateNoteRequestParams = {
  name: string;
  description: string;
  id: string;
};

export type UpdateNoteResponseData = {
  data: {
    name: string;
    description: string;
  };
  message: 'success';
};

export type UpdateNoteRequestParams = {
  name: string;
  description: string;
  noteId: string;
  folderId: string;
};

export type DeleteNoteResponseData = {
  message: 'deleted';
};

export type SignInResponseData = {
  email: string;
  id: string;
  folders: Folder[];
};
