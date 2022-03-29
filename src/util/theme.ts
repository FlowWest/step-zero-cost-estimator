import deepMerge from 'deepmerge';
import { createTheme, responsiveFontSizes, ThemeOptions, Theme } from '@material-ui/core/styles';

const makeTheme = (variant: ThemeOptions): Theme => {
  const common = {
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*::-webkit-scrollbar': {
            width: '0.5rem'
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#888'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#555'
          }
        }
      },
      MuiInputBase: {
        root: {
          color: 'black',
          margin: '1px'
        }
      }
    }
  };
  const theme = createTheme(deepMerge(common, variant));
  return responsiveFontSizes(theme);
};

const light: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#306b99'
    },
    secondary: {
      main: '#7cd2f7'
    },
    error: {
      main: '#f03e3e'
    },
    warning: {
      main: '#f0a04f'
    },
    info: {
      main: '#709ecc'
    },
    success: {
      main: '#4fe054'
    },
    text: {
      primary: '#fff',
      secondary: '#2e3133',
      hint: '#363c42',
      disabled: '#48494a'
    },
    background: {
      default: '#f6f6f7',
      paper: '#0c7cba'
    }
  }
};

const dark: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#5988ad'
    },
    secondary: {
      main: '#0b1e26'
    },
    error: {
      main: '#870505'
    },
    warning: {
      main: '#964c00'
    },
    info: {
      main: '#09539c'
    },
    success: {
      main: '#034d06'
    },
    text: {
      primary: '#f8f9fa',
      secondary: '#e4e7eb',
      hint: '#bbbcbd',
      disabled: '#ccc'
    },
    background: {
      default: '#1c2c33',
      paper: '#214a6b'
    }
  }
};

const themes: { [key: string]: Theme } = {
  light: makeTheme(light),
  dark: makeTheme(dark)
};

export const themeCookie = 'clthmvar';

export default themes;
