/* eslint-disable arrow-body-style */
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { loading } from '../../store/reducers/loadingReducer';
import {
  fetchFoldersSuccess,
  fetchFoldersFail,
  createFolderInit,
  createFolderSuccess,
  createFolderFail,
  updateFolderInit,
  updateFolderSuccess,
  updateFolderFail,
  deleteFolderInit,
  deleteFolderSuccess,
  deleteFolderFail,
} from '../../store/reducers/foldersReducer';
import {
  fetchFoldersSaga,
  createFolderSaga,
  updateFolderSaga,
  deleteFolderSaga,
} from '../../store/sagas/folders';
import api from '../../api';

describe('Folders Sagas', () => {
  it('fetchFoldersSaga fetches user\'s folders from server', () => {
    return expectSaga(fetchFoldersSaga)
      .put(loading())
      .put(fetchFoldersSuccess(
        [
          {
            _id: '1',
            user: 'abcd12345',
            name: 'Folder 1',
          },
          {
            _id: '2',
            user: 'abcd12345',
            name: 'Folder 2',
          },
          {
            _id: '3',
            user: 'abcd12345',
            name: 'Folder 3',
          },
        ],
      ))
      .put(loading())
      .run();
  });

  it('fetchFoldersSaga handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchFoldersSaga)
      .provide([
        [matchers.call.fn(api.getFolders), throwError(error)],
      ])
      .put(loading())
      .put(loading())
      .put(fetchFoldersFail())
      .run();
  });

  it('createFoldersSaga creates a new folder', () => {
    return expectSaga(createFolderSaga, { type: createFolderInit.type, payload: { name: 'New Folder' } })
      .put(loading())
      .put(createFolderSuccess({
        name: 'New Folder',
        _id: '4',
      }))
      .put(loading())
      .run();
  });

  it('createFolderSaga handles errors', () => {
    const error = new Error('error');

    return expectSaga(createFolderSaga, { type: createFolderInit.type, payload: { name: 'New Folder' } })
      .provide([
        [matchers.call.fn(api.createFolder), throwError(error)],
      ])
      .put(loading())
      .put(loading())
      .put(createFolderFail())
      .run();
  });

  it('updateFolderSaga updates existing folder', () => {
    return expectSaga(updateFolderSaga, { type: updateFolderInit.type, payload: { name: 'Updated Folder', _id: '1' } })
      .put(loading())
      .put(updateFolderSuccess({ name: 'Updated Folder', _id: '1' }))
      .put(loading())
      .run();
  });

  it('updateFolderSaga handles errors', () => {
    const error = new Error('error');

    return expectSaga(updateFolderSaga, { type: updateFolderInit.type, payload: { name: 'Updated Folder', _id: '1' } })
      .provide([
        [matchers.call.fn(api.updateFolder), throwError(error)],
      ])
      .put(loading())
      .put(loading())
      .put(updateFolderFail())
      .run();
  });

  it('deleteFolderSaga deletes folder', () => {
    return expectSaga(deleteFolderSaga, { type: deleteFolderInit.type, payload: '1' })
      .put(loading())
      .put(deleteFolderSuccess('1'))
      .put(loading())
      .run();
  });

  it('deleteFolderSaga handles errors', () => {
    const error = new Error('error');

    return expectSaga(deleteFolderSaga, { type: deleteFolderInit.type, payload: '1' })
      .provide([
        [matchers.call.fn(api.deleteFolder), throwError(error)],
      ])
      .put(loading())
      .put(loading())
      .put(deleteFolderFail())
      .run();
  });
});
