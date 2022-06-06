import React from 'react';
import { Typography } from '@mui/material';

const WarningMessage = () => {
  return (
    <Typography paragraph sx={{ fontStyle: 'italic' }}>
      The information provided on this page is for a step zero analysis and is intended for
      exploratory purposes only. The calculations are not a replacement for a full feasibility
      analysis.
    </Typography>
  );
};

export default WarningMessage;
