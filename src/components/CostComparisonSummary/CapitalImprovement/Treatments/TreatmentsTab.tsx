import React, { useState, useContext } from 'react';
import { Grid, Button } from '@mui/material';
import AddTreatmentsModal from './AddTreatmentsModal';
import TreatmentsDataGrid from './TreatmentsDataGrid';
import { WaterSystemContext } from '../../../../contexts/WaterSystem';

function TreatmentsTab() {
  const [state, dispatch] = useContext(WaterSystemContext) as any;
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
      <TreatmentsDataGrid rows={state.selectedTreatments} openAddTreatments={setOpen} />
      <AddTreatmentsModal open={open} handleClose={handleClose} />
    </>
  );
}

export default TreatmentsTab;
