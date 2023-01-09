import React, { useContext } from 'react';
import { Grid, Typography, Theme, Divider } from '@mui/material';
import WaterSystemDetails from './WaterSystemDetails';
import { makeStyles } from '@mui/styles';
import TotalConsolidationCost from './TotalConsolidationCost';
import ExportButtonGroup from '../../uiComponents/ExportButtonGroup';
import { WaterSystemContext } from '../../../contexts/WaterSystem';

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    paddingTop: '1rem'
  },
  waterSystemsDetailsContainer: {
    [theme.breakpoints.up('md')]: {
      paddingRight: '1rem',
      borderRight: `1px solid ${theme.palette.background.divider}`
    }
  },
  editWaterSystemHeader: {
    fontWeight: 600
  },
  editWaterSystemDescription: { marginBottom: '2rem' }
}));

const ConsolidationCalculator = (): JSX.Element => {
  const [state, dispatch] = useContext(WaterSystemContext) as Array<any>;
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={4}
          order={{ xs: 3, md: 2 }}
          className={`${classes.contentContainer} ${classes.waterSystemsDetailsContainer}`}
        >
          <Typography className={classes.editWaterSystemHeader} paragraph>
            Edit Water System Details
          </Typography>
          <Typography className={classes.editWaterSystemDescription} paragraph>
            {state.currentWaterSystem?.joinSystemPWSID
              ? `These values are meant to be a starting point for your calculations and estimates. You may adjust the values below to. The consolidation cost estimates will be updated automatically based on the new values.`
              : `For user-created water systems, the values for Number of Connections and Distance to Receiving System have been set to predetermined values. Please adjust those fields to better represent the water system.`}
          </Typography>
          <WaterSystemDetails />
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 3 }} className={classes.contentContainer}>
          <TotalConsolidationCost />
        </Grid>
      </Grid>
      <Divider />
      <Grid
        spacing={2}
        container
        item
        xs={12}
        className={classes.contentContainer}
        justifyContent="flex-end"
        order={{ xs: 4, md: 4 }}
      >
        <ExportButtonGroup state={state} />
      </Grid>
    </>
  );
};

export default ConsolidationCalculator;
