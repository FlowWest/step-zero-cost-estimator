import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import WaterSystemComponentsGrid from '../WaterSystemComponentsGrid';
import AddComponentsModal from './AddComponentsModal';

function SystemComponentsTab() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <AddComponentsModal open={open} handleClose={handleClose} />
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleOpen}>
          Add Components
        </Button>
      </Grid>
      <br />
      <WaterSystemComponentsGrid openAddComponents={handleOpen} />
    </>
  );
}

export default SystemComponentsTab;
