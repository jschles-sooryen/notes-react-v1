import { all, takeEvery } from 'redux-saga/effects';
import { fetchNotesSaga } from './notes';
import { FETCH_NOTES_INIT } from '../actions/types';

function* watchNotes() {
  yield takeEvery(FETCH_NOTES_INIT, fetchNotesSaga);
}

export default function* rootSaga() {
  yield all([watchNotes()]);
}
