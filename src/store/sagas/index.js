import { all, takeEvery } from 'redux-saga/effects';
import { fetchFoldersSaga, createFolderSaga } from './folders';
import { FETCH_FOLDERS_INIT, CREATE_FOLDER_INIT } from '../actions/types';

function* watchFolders() {
  yield takeEvery(FETCH_FOLDERS_INIT, fetchFoldersSaga);
  yield takeEvery(CREATE_FOLDER_INIT, createFolderSaga);
}

export default function* rootSaga() {
  yield all([watchFolders()]);
}
