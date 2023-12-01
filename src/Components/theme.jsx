import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    // Add more palette colors or customize other theme properties as needed
  },
  // Add other customizations like typography, spacing, etc.
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ab003c',
    },
    secondary: {
      main: '#f50057',
    },
    // Add more palette colors or customize other theme properties as needed
  },
  // Add other customizations like typography, spacing, etc.
});

export default {
  lightTheme,
  darkTheme,
};
