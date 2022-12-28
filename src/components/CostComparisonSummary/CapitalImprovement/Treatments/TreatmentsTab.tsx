import React, { useState, useContext, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import AddTreatmentsModal from './AddTreatmentsModal';
import TreatmentsDataGrid from './TreatmentsDataGrid';
import { WaterSystemContext } from '../../../../contexts/WaterSystem';
import { updateCIPCostData } from '../../../../contexts/WaterSystem/actions';

function TreatmentsTab() {
  const [state, dispatch] = useContext(WaterSystemContext) as any;
  const [open, setOpen] = useState(false);
  const [totalCostValues, setTotalCostValues] = useState([] as Array<any>);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setTotalCostValues([...state.selectedTreatments]);
  }, [state.selectedTreatments]);

  useEffect(() => {
    const updatedCostValues = totalCostValues.reduce(
      (previousValue, currentValue) => {
        const newValue = { ...previousValue };

        newValue.operationalCost += currentValue.operationalCost || 0;
        newValue.capitalCost += currentValue.capitalCost || 0;

        return newValue;
      },
      {
        operationalCost: 0,
        capitalCost: 0
      }
    );
    dispatch(updateCIPCostData('treatmentOperational', updatedCostValues.operationalCost));
    dispatch(updateCIPCostData('treatmentCapital', updatedCostValues.capitalCost));
  }, [totalCostValues]);
  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleOpen}>
          Add Treatments
        </Button>
      </Grid>
      <br />
      <TreatmentsDataGrid
        rows={state.selectedTreatments}
        openAddTreatments={setOpen}
        setTotalCostValues={setTotalCostValues}
      />
      <AddTreatmentsModal open={open} handleClose={handleClose} />
    </>
  );
}

export default TreatmentsTab;
