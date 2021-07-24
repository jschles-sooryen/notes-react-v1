/* eslint-disable import/prefer-default-export */
import { put } from 'redux-saga/effects';
import {
  fetchNotesSuccess,
  fetchNotesFail,
  loading,
} from '../actions';

const domain = process.env.REACT_APP_API_SERVER;

export function* fetchNotesSaga(action) {
  yield put(loading());
  try {
    const response = yield fetch(`${domain}/api/folders/${action.payload}/notes`);
    const data = yield response.json();
    yield put(fetchNotesSuccess(data.data));
    yield put(loading());
  } catch (e) {
    yield put(loading());
    yield put(fetchNotesFail());
  }
}
