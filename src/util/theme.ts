import deepMerge from 'deepmerge';
import { createTheme, responsiveFontSizes, ThemeOptions, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    content: string;
    divider: string;
  }
  interface Palette {
    cancel: any;
  }
  interface PaletteOptions {
    cancel: any;
  }
}

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
          margin: '1px'
        }
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1300,
        xl: 1536
      }
    }
  };
  const theme = createTheme(deepMerge(common, variant));
  return responsiveFontSizes(theme);
};

const light: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      light: '#83bbe5',
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
    background: {
      default: '#f6f6f7',
      paper: '#0c7cba',
      content: '#ffffff',
      divider: 'rgba(0, 0, 0, 0.12)'
    },
    cancel: {
      main: '#bdc3c7',
      dark: '#84888B'
    }
  }
};

const dark: ThemeOptions = {
  palette: {
    mode: 'dark',
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
    background: {
      default: '#1c2c33',
      paper: '#214a6b',
      content: '#424242',
      divider: 'rgba(255, 255, 255, 0.12)'
    },
    cancel: {
      main: '#bdc3c7',
      dark: '#84888B'
    }
  }
};

const themes: { [key: string]: Theme } = {
  light: makeTheme(light),
  dark: makeTheme(dark)
};

export const themeCookie = 'clthmvar';

export default themes;
