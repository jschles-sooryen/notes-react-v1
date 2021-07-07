import { all, takeEvery } from 'redux-saga/effects';
import { fetchFoldersSaga } from './folders';
import { FETCH_FOLDERS_INIT } from '../actions/types';

function* watchFolders() {
  yield takeEvery(FETCH_FOLDERS_INIT, fetchFoldersSaga);
}

export default function* rootSaga() {
  yield all([watchFolders()]);
}
