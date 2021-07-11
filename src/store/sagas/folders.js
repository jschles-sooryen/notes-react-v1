/* eslint-disable import/prefer-default-export */
import { put } from 'redux-saga/effects';
import { fetchFoldersSuccess, fetchFoldersFail, loading } from '../actions';

const domain = process.env.REACT_APP_API_SERVER;

export function* fetchFoldersSaga() {
  yield put(loading());
  try {
    const response = yield fetch(`${domain}/api/folders`);
    const data = yield response.json();
    yield put(loading());
    yield put(fetchFoldersSuccess(data.data));
  } catch (e) {
    yield put(loading());
    yield put(fetchFoldersFail());
  }
}
