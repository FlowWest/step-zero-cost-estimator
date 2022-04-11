import React from 'react';
import { Grid, Typography, Theme, Button } from '@mui/material';
import WaterSystemDetails from './WaterSystemDetails';
import { makeStyles } from '@mui/styles';
import TotalConsolidationCost from './TotalConsolidationCost';

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    paddingTop: '2rem'
  },
  waterSystemsDetailsContainer: {
    borderRight: `1px solid ${theme.palette.background.divider}`
  },
  totalCostContainer: {
    textAlign: 'center'
  },
  editWaterSystemHeader: {
    fontWeight: 600
  }
}));

const ConsolidationCalculator = () => {
  const styles = useStyles();
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h5">Consolidation Calculator</Typography>
      </Grid>
      <Grid
        item
        xs={4}
        className={`${styles.contentContainer} ${styles.waterSystemsDetailsContainer}`}
      >
        <Typography className={styles.editWaterSystemHeader} paragraph>
          Edit Water System Details
        </Typography>
        <Typography paragraph>
          Paragraph describing how these values are prepopulated from existing data, but user is
          allowed to edit values if they see fit.
        </Typography>
        <WaterSystemDetails />
      </Grid>
      <Grid item xs={8} className={`${styles.contentContainer} ${styles.totalCostContainer}`}>
        <TotalConsolidationCost />
      </Grid>
      <Grid
        spacing={2}
        container
        item
        xs={12}
        className={styles.contentContainer}
        justifyContent="flex-end"
      >
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
      </Grid>
    </Grid>
  );
};

export default ConsolidationCalculator;
