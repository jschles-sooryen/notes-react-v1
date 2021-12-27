import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import foldersReducer from './reducers/foldersReducer';
import notesReducer from './reducers/notesReducer';
import loadingReducer from './reducers/loadingReducer';
import authReducer from './reducers/authReducer';
import rootSaga from './sagas';

export const createStoreWithSaga = (): EnhancedStore => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      folders: foldersReducer,
      notes: notesReducer,
      loading: loadingReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = createStoreWithSaga();

export default store;
