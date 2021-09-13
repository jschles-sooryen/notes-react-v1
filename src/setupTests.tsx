/* eslint-disable no-undef */
import { FC, ReactElement } from 'react';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render as rtlRender, RenderResult, cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import rootReducer from './store/reducers';
import rootSaga from './store/sagas';
import theme from './styles/theme';

const domain = process.env.REACT_APP_API_SERVER;

const createMockStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

const render = (
  ui: ReactElement,
  {
    store = createMockStore(),
    ...renderOptions
  } = {},
): RenderResult => {
  const Wrapper: FC = ({ children }) => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

const handlers = [
  rest.get(
    `${domain}/api/folders`,
    (req, res, ctx) => (
      res(ctx.json({
        data:
          [
            {
              id: 1,
              name: 'Folder 1',
            },
            {
              id: 2,
              name: 'Folder 2',
            },
            {
              id: 3,
              name: 'Folder 3',
            },
          ],
      }))
    ),
  ),
  rest.get(
    `${domain}/api/folders/:id/notes`,
    (req, res, ctx) => {
      const folderId = req.params.id;
      return res(ctx.json({
        data:
          [
            {
              id: 1,
              name: 'Note 1',
              description: 'Hi',
              folderId,
              createdAt: '2021-09-13T14:46:40.000Z',
              updatedAt: '2021-09-13T14:46:40.000Z',
            },
            {
              id: 2,
              name: 'Note 2',
              description: 'Hello',
              folderId,
              createdAt: '2021-09-13T14:46:47.000Z',
              updatedAt: '2021-09-13T14:46:47.000Z',
            },
          ],
      }));
    },
  ),
  rest.delete(
    `${domain}/api/folders/:id`,
    (req, res, ctx) => res(ctx.json({
      message: 'deleted',
    })),
  ),
];

const server = setupServer(...handlers);

beforeAll(() => {
  cleanup();
  server.listen();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

export * from '@testing-library/react';
export { render, server };
