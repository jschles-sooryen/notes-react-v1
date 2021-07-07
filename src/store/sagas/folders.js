/* eslint-disable import/prefer-default-export */
import { put } from 'redux-saga/effects';
import { fetchFoldersSuccess } from '../actions';

export function* fetchFoldersSaga() {
  yield put(fetchFoldersSuccess({
    id: 1,
    title: 'Folder 1',
  }));
}
