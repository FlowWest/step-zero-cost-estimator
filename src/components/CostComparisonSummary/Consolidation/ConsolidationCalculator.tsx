import React from 'react';
import { Grid, Typography } from '@mui/material';
import WaterSystemDetails from './WaterSystemDetails';
import BarChart from '../../uiComponents/BarChart';

const ConsolidationCalculator = (props: any) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h6">Consolidation Calculator</Typography>
      </Grid>
      <Grid item xs={12} md={5} order={{ xs: 3, md: 2 }} style={{ padding: '2rem' }}>
        <Typography paragraph>Edit Water System Details</Typography>
        <Typography paragraph>
          Paragraph describing how these values are prepopulated from existing data, but user is
          allowed to edit values if they see fit.
        </Typography>
        <WaterSystemDetails />
      </Grid>
      <Grid item xs={12} md={7} order={{ xs: 2, md: 3 }} style={{}}>
        <Typography variant="h5">Total Consolidation Cost: $4,445,459</Typography>
        <BarChart />
      </Grid>
    </Grid>
  );
};

export default ConsolidationCalculator;
