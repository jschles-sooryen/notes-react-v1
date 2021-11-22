/* eslint-disable quote-props */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { number } from 'prop-types';
import Cookies from 'js-cookie';
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
  SignInResponseData,
} from './types';

const domain = process.env.REACT_APP_API_SERVER;

export const makeApiRequest = async <T, U = void | Blob>(url: string, method?: string, params?: U): Promise<T> => {
  const httpMethod = method || 'GET';
  const token = Cookies.get('access_token');
  const isParamsBlob = params instanceof Blob;

  let response;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token || '',
  };

  if (httpMethod === 'GET') {
    response = await fetch(url, { headers });
  } else {
    response = await fetch(url, {
      method: httpMethod,
      headers,
      body: isParamsBlob ? params : JSON.stringify(params),
    });
  }

  const responseData: T = await response.json();

  if (url === `${domain}/auth`) {
    console.log('Setting new access token');
    const accessToken = response.headers.get('x-auth-token') as string;
    Cookies.set('access_token', accessToken);
  }

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
  signIn: <SignInResponseData>(params: Blob): Promise<SignInResponseData> => (
    makeApiRequest<SignInResponseData>(`${domain}/auth`, 'POST', params)
  ),
};

export default api;
