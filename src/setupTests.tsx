/* eslint-disable no-undef */
import { FC, ReactElement } from 'react';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
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

const server = setupServer(
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
  rest.delete(
    `${domain}/api/folders/:id`,
    (req, res, ctx) => {
      console.log('TEST DELETE', req.params);
      res(ctx.json({
        message: 'deleted',
      }));
    },
  ),
);

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
