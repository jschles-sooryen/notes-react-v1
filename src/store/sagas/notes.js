/* eslint-disable import/prefer-default-export */
import { put } from 'redux-saga/effects';
import { fetchNotesSuccess } from '../actions';

export function* fetchNotesSaga() {
  yield put(fetchNotesSuccess({
    id: 1,
    title: 'Note 1',
    description: 'Note 1 Description',
  }));
}
