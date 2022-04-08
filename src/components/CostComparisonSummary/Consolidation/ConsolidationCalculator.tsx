import React from 'react';
import { Grid, Typography } from '@mui/material';
import WaterSystemDetails from './WaterSystemDetails';

const ConsolidationCalculator = (props: any) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h6">Consolidation Calculator</Typography>
      </Grid>
      <Grid item xs={4} style={{ padding: '2rem' }}>
        <Typography paragraph>Edit Water System Details</Typography>
        <Typography paragraph>
          Paragraph describing how these values are prepopulated from existing data, but user is
          allowed to edit values if they see fit.
        </Typography>
        <WaterSystemDetails />
      </Grid>
      <Grid item xs={8} style={{ background: 'yellow' }}>
        <Typography paragraph>Consolidation Calculator</Typography>
      </Grid>
    </Grid>
  );
};

export default ConsolidationCalculator;
