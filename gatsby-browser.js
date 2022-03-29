import React from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

export const wrapRootElement = ({ element }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>{element}</ThemeProvider>
    </StyledEngineProvider>
  );
};
