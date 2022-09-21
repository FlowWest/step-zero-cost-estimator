import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import AddTreatmentsModal from './AddTreatmentsModal';

function TreatmentsTab() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleOpen}>
          Add Treatments
        </Button>
      </Grid>
      <br />
      <AddTreatmentsModal open={open} handleClose={handleClose} />
    </>
  );
}

export default TreatmentsTab;
