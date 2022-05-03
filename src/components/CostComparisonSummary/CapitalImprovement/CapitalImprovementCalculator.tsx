import React, { useState } from 'react';
import { Typography, Grid, Theme, TextField, Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import WaterSystemDetailsCIP from './WaterSystemDetailsCIP';
import WaterSystemComponentsGrid from './WaterSystemComponentsGrid';
import AddComponentsModal from './AddComponentsModal';

const useStyles = makeStyles((theme: Theme) => ({
  cipHeader: {
    fontWeight: 600
  }
}));

function CapitalImprovementCalculator(props: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Grid item xs={12}>
        <Divider />
        <br />
      <AddComponentsModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleOpen}>
            Add Components
          </Button>
        </Grid>
        <br />
        <WaterSystemComponentsGrid />
      </Grid>
    </Grid>
  );
}

export default CapitalImprovementCalculator;
