import { Folder } from '../store/types';

export type GetFoldersResponseData = {
  data: Folder[];
  message: 'success';
};

export type CreateFolderRequestParams = {
  name: string;
};

export type CreateFolderResponseData = {
  data: Folder;
  id: number;
  message: 'success';
};

export type UpdateFolderRequestParams = {
  id: number;
  name: string;
};

export type UpdateFolderResponseData = {
  data: {
    name: string;
  };
  messsage: 'success';
};

export type DeleteFolderResponseData = {
  message: 'deleted';
};
