/* eslint-disable import/prefer-default-export */
import { put } from 'redux-saga/effects';
import { fetchFoldersSuccess, fetchFoldersFail } from '../actions';

const domain = process.env.REACT_APP_API_SERVER;

export function* fetchFoldersSaga() {
  try {
    const response = yield fetch(`${domain}/api/folders`);
    const data = yield response.json();
    console.log('data', data);
    yield put(fetchFoldersSuccess(data.data));
  } catch (e) {
    yield put(fetchFoldersFail());
  }
}
