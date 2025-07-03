import { createMuiTheme } from '@material-ui/core/styles';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#f4f6fb',
      paper: '#ffffff', 
    },
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#03dac6',
    },
    text: {
      primary: '#222b45',
      secondary: '#6e7582',
    },
  },
});

export default lightTheme; 