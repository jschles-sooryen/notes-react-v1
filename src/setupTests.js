/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import store from './store';
import theme from './styles/theme';

const domain = process.env.REACT_APP_API_SERVER;

const AllTheProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      {children}
    </Provider>
  </ThemeProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

const server = setupServer(
  rest.get(`${domain}/api/folders`, (req, res, ctx) => (
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
  )),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export * from '@testing-library/react';
export { customRender as render, server };
