import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import store from './store';
import theme from './styles/theme';

const AllTheProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      {children}
    </Provider>
  </ThemeProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
