/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { number } from 'prop-types';
import {
  GetFoldersResponseData,
  CreateFolderRequestParams,
  CreateFolderResponseData,
  UpdateFolderRequestParams,
  UpdateFolderResponseData,
  DeleteFolderResponseData,
  GetNotesResponseData,
  CreateNoteResponseData,
  CreateNoteRequestParams,
  UpdateNoteResponseData,
  UpdateNoteRequestParams,
  DeleteNoteResponseData,
} from './types';

const domain = process.env.REACT_APP_API_SERVER;

export const makeApiRequest = async <T, U = void>(url: string, method?: string, params?: U): Promise<T> => {
  const httpMethod = method || 'GET';

  let response;

  if (httpMethod === 'GET') {
    response = await fetch(url);
  } else {
    response = await fetch(url, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }

  const responseData: T = await response.json();

  return responseData;
};

const api = {
  getFolders: <GetFoldersResponseData>(): Promise<GetFoldersResponseData> => (
    makeApiRequest<GetFoldersResponseData>(`${domain}/folders`)
  ),
  createFolder: <CreateFolderResponseData, CreateFolderRequestParams>(params: CreateFolderRequestParams): Promise<CreateFolderResponseData> => (
    makeApiRequest<CreateFolderResponseData, CreateFolderRequestParams>(`${domain}/folders`, 'POST', params)
  ),
  updateFolder: <UpdateFolderResponseData, UpdateFolderRequestParams>(params: UpdateFolderRequestParams): Promise<UpdateFolderResponseData> => (
    makeApiRequest<UpdateFolderResponseData, UpdateFolderRequestParams>(`${domain}/folders`, 'PATCH', params)
  ),
  deleteFolder: <DeleteFolderResponseData>(id: string): Promise<DeleteFolderResponseData> => (
    makeApiRequest<DeleteFolderResponseData>(`${domain}/folders?id=${id}`, 'DELETE')
  ),
  getNotes: <GetNotesResponseData>(folderId: string): Promise<GetNotesResponseData> => (
    makeApiRequest<GetNotesResponseData>(`${domain}/notes?id=${folderId}`)
  ),
  createNote: <CreateNoteResponseData, CreateNoteRequestParams>(params: CreateNoteRequestParams): Promise<CreateNoteResponseData> => (
    makeApiRequest<CreateNoteResponseData, CreateNoteRequestParams>(`${domain}/notes`, 'POST', params)
  ),
  updateNote: <UpdateNoteResponseData, UpdateNoteRequestParams>(params: UpdateNoteRequestParams): Promise<UpdateNoteResponseData> => (
    makeApiRequest<UpdateNoteResponseData, UpdateNoteRequestParams>(`${domain}/notes`, 'PATCH', params)
  ),
  deleteNote: <DeleteNoteResponseData>(noteId: string): Promise<DeleteNoteResponseData> => (
    makeApiRequest<DeleteNoteResponseData>(`${domain}/notes?id=${noteId}`, 'DELETE')
  ),
};

export default api;
