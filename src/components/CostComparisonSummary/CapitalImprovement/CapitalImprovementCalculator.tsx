import React, { useState } from 'react';
import { Typography, Grid, Button, Divider } from '@mui/material';
import WaterSystemDetailsCIP from './WaterSystemDetailsCIP';
import WaterSystemComponentsGrid from './WaterSystemComponentsGrid';
import AddComponentsModal from './AddComponentsModal';

function CapitalImprovementCalculator(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log('hello');
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          Capital Improvement Calculator
        </Typography>
      </Grid>
      <WaterSystemDetailsCIP />
      <Grid item xs={12}>
        <Divider />
        <br />
        <AddComponentsModal open={open} handleClose={handleClose} />
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleOpen}>
            Add Components
          </Button>
        </Grid>
        <br />
        <WaterSystemComponentsGrid openAddComponents={handleOpen} />
      </Grid>
    </Grid>
  );
}

export default CapitalImprovementCalculator;
