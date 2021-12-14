/* eslint-disable no-undef */
import { FC, ReactElement } from 'react';
import '@testing-library/jest-dom';
import { render as rtlRender, RenderResult, cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import { createStoreWithSaga } from './store';
import { signInSuccess } from './store/reducers/authReducer';
import theme from './styles/theme';

const domain = process.env.REACT_APP_API_SERVER;
console.log('domain ', domain);

const render = (
  ui: ReactElement,
  isAuth = true,
  {
    store = createStoreWithSaga(),
    ...renderOptions
  } = {},
): RenderResult => {
  if (isAuth) {
    store.dispatch(signInSuccess({
      email: 'john@encora.com',
      _id: 'abcd12345',
    }));
  }
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
    `${domain}/folders`,
    (req, res, ctx) => (
      res(ctx.json({
        data:
          [
            {
              _id: '1',
              user: 'abcd12345',
              name: 'Folder 1',
            },
            {
              _id: '2',
              user: 'abcd12345',
              name: 'Folder 2',
            },
            {
              _id: '3',
              user: 'abcd12345',
              name: 'Folder 3',
            },
          ],
      }))
    ),
  ),
  rest.get(
    `${domain}/notes`,
    (req, res, ctx) => {
      const folderId = req.params.id;
      return res(ctx.json({
        data:
          [
            {
              _id: '1',
              name: 'Note 1',
              description: 'Hi',
              folder: folderId,
              createdAt: '2021-09-13T14:46:40.000Z',
              updatedAt: '2021-09-13T14:46:40.000Z',
            },
            {
              _id: '2',
              name: 'Note 2',
              description: 'Hello',
              folder: folderId,
              createdAt: '2021-09-13T14:46:47.000Z',
              updatedAt: '2021-09-13T14:46:47.000Z',
            },
          ],
      }));
    },
  ),
  rest.delete(
    `${domain}/folders`,
    (req, res, ctx) => res(ctx.json({
      message: 'deleted',
    })),
  ),
  rest.delete(
    `${domain}/notes`,
    (req, res, ctx) => res(ctx.json({
      message: 'deleted',
    })),
  ),
  rest.post(
    `${domain}/auth`,
    (req, res, ctx) => res(ctx.json({
      email: 'john@encora.com',
      _id: 'abcd12345',
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
