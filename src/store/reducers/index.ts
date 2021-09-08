import { combineReducers } from 'redux';
import foldersReducer from './foldersReducer';
import notesReducer from './notesReducer';
import loadingReducer from './loadingReducer';
import layoutReducer from './layoutReducer';

const rootReducer = combineReducers({
  folders: foldersReducer,
  notes: notesReducer,
  loading: loadingReducer,
  layout: layoutReducer,
});

export default rootReducer;
