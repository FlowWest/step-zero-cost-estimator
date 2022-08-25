import React from 'react';
import { Grid, Button } from '@mui/material';

const ExportButtonGroup = () => {
  return (
    <>
      <Grid item xs={12} md={4} lg={2}>
        <Button variant="contained" fullWidth>
          Export Excel
        </Button>
      </Grid>
      <Grid item xs={12} md={4} lg={2}>
        <Button variant="contained" fullWidth>
          Export CSV
        </Button>
      </Grid>
      <Grid item xs={12} md={4} lg={2}>
        <Button variant="contained" fullWidth>
          Export PDF
        </Button>
      </Grid>
    </>
  );
};

export default ExportButtonGroup;
