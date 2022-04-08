import React from 'react';
import { Grid, Typography, Theme } from '@mui/material';
import WaterSystemDetails from './WaterSystemDetails';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    padding: '2rem'
  },
  waterSystemsDetailsContainer: {
    borderRight: `1px solid rgba(0, 0, 0, 0.12)`
  }
}));

const ConsolidationCalculator = (props: any) => {
  const styles = useStyles();
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h6">Consolidation Calculator</Typography>
      </Grid>
      <Grid
        item
        xs={4}
        className={`${styles.contentContainer} ${styles.waterSystemsDetailsContainer}`}
      >
        <Typography paragraph>Edit Water System Details</Typography>
        <Typography paragraph>
          Paragraph describing how these values are prepopulated from existing data, but user is
          allowed to edit values if they see fit.
        </Typography>
        <WaterSystemDetails />
      </Grid>
      <Grid item xs={8} className={styles.contentContainer}>
        <Typography paragraph>Consolidation Calculator</Typography>
      </Grid>
    </Grid>
  );
};

export default ConsolidationCalculator;
