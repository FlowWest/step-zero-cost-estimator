import React from 'react';
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
