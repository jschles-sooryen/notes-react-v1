/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GetFoldersResponseData,
  CreateFolderRequestParams,
  CreateFolderResponseData,
  UpdateFolderRequestParams,
  UpdateFolderResponseData,
  DeleteFolderResponseData,
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
};

export default api;
