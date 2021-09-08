import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#282c34',
    },
    secondary: {
      main: '#000080',
    },
  },
  spacing: 8,
  typography: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 16,
  },
});

export default theme;
