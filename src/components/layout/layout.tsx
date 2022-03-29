import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import MetaLayout from './meta-layout';
import { FCR, themes, getCookie, setCookie, themeCookie } from '../../util';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const Layout: FCR = (props) => {
  const [theme, setTheme] = useState<Theme>(themes[getCookie(themeCookie) || 'light']);
  const switchTheme = (darkModeOn: boolean): void => {
    setTheme(() => {
      const newTheme = darkModeOn ? 'dark' : 'light';
      setCookie(themeCookie, newTheme);
      return themes[newTheme];
    });
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MetaLayout switchTheme={switchTheme}>{props.children}</MetaLayout>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Layout;
