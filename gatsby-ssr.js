/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
import { WaterSystemProvider } from './src/contexts/WaterSystem';
import { FCR, themes, getCookie, setCookie, themeCookie } from './src/util';
import makeStyles from '@mui/styles/makeStyles';

export const wrapRootElement = ({ element }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes['light']}>
        <WaterSystemProvider>{element}</WaterSystemProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export function replaceHydrateFunction() {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback);
  };
}
