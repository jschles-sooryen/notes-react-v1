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
    makeApiRequest<GetFoldersResponseData>(`${domain}/api/folders`)
  ),
  createFolder: <CreateFolderResponseData, CreateFolderRequestParams>(params: CreateFolderRequestParams): Promise<CreateFolderResponseData> => (
    makeApiRequest<CreateFolderResponseData, CreateFolderRequestParams>(`${domain}/api/folders`, 'POST', params)
  ),
  updateFolder: <UpdateFolderResponseData, UpdateFolderRequestParams>(params: UpdateFolderRequestParams, id: number): Promise<UpdateFolderResponseData> => (
    makeApiRequest<UpdateFolderResponseData, UpdateFolderRequestParams>(`${domain}/api/folders/${id}`, 'PATCH', params)
  ),
  deleteFolder: <DeleteFolderResponseData>(id: number): Promise<DeleteFolderResponseData> => (
    makeApiRequest<DeleteFolderResponseData>(`${domain}/api/folders/${id}`, 'DELETE')
  ),
  getNotes: <GetNotesResponseData>(folderId: number): Promise<GetNotesResponseData> => (
    makeApiRequest<GetNotesResponseData>(`${domain}/api/folders/${folderId}/notes`)
  ),
  createNote: <CreateNoteResponseData, CreateNoteRequestParams>(params: CreateNoteRequestParams, folderId: number): Promise<CreateNoteResponseData> => (
    makeApiRequest<CreateNoteResponseData, CreateNoteRequestParams>(`${domain}/api/folders/${folderId}/notes`, 'POST', params)
  ),
  updateNote: <UpdateNoteResponseData, UpdateNoteRequestParams>(params: UpdateNoteRequestParams, folderId: number, noteId: number): Promise<UpdateNoteResponseData> => (
    makeApiRequest<UpdateNoteResponseData, UpdateNoteRequestParams>(`${domain}/api/folders/${folderId}/notes/${noteId}`, 'PATCH', params)
  ),
  deleteNote: <DeleteNoteResponseData>(folderId: number, noteId: number): Promise<DeleteNoteResponseData> => (
    makeApiRequest<DeleteNoteResponseData>(`${domain}/api/folders/${folderId}/notes/${noteId}`, 'DELETE')
  ),
};

export default api;
