import { combineReducers } from 'redux';
import foldersReducer from './foldersReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  folders: foldersReducer,
  loading: loadingReducer,
});

export default rootReducer;
