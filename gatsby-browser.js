import React from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
import { WaterSystemProvider } from './src/contexts/WaterSystem';

import makeStyles from '@mui/styles/makeStyles';

export const wrapRootElement = ({ element }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <WaterSystemProvider>{element}</WaterSystemProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
