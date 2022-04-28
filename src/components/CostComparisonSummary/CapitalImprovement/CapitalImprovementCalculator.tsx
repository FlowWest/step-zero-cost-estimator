import React from 'react';
import { Typography, Grid, Theme, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import WaterSystemDetailsCIP from './WaterSystemDetailsCIP';

const useStyles = makeStyles((theme: Theme) => ({
  cipHeader: {
    fontWeight: 600
  }
}));

function CapitalImprovementCalculator(props: any) {
  const classes = useStyles();
  return (
    <Grid
      container
      rowSpacing={3}
      // style={{
      //   paddingBottom: '1rem',
      //   borderBottom: `3px solid ${theme.palette.divider}`
      // }}
    >
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.cipHeader}>
          Capital Improvement Calculator
        </Typography>
      </Grid>
      <WaterSystemDetailsCIP />
      <Grid item>
        <Button variant="contained">Add Components</Button>
      </Grid>
    </Grid>
  );
}

export default CapitalImprovementCalculator;
