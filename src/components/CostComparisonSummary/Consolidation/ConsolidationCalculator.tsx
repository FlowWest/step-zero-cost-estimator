import React, { useContext, useState, useEffect } from 'react';
import { Grid, Typography, Theme, Divider } from '@mui/material';
import WaterSystemDetails from './WaterSystemDetails';
import { makeStyles } from '@mui/styles';
import TotalConsolidationCost from './TotalConsolidationCost';
import ExportButtonGroup from '../../uiComponents/ExportButtonGroup';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { updateChartImage } from '../../../contexts/WaterSystem/actions';
import { Chart } from 'chart.js';
import { has } from 'lodash';

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
  }
}));

const ConsolidationCalculator = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext);

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
          <Typography paragraph>
            Paragraph describing how these values are prepopulated from existing data, but user is
            allowed to edit values if they see fit.
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
