import { combineReducers } from 'redux';
import foldersReducer from './foldersReducer';

const rootReducer = combineReducers({
  folders: foldersReducer,
});

export default rootReducer;
